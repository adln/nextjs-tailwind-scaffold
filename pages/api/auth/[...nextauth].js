import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { apiServerSide } from '@/lib/api';


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {

        const api = apiServerSide();
        try {
          const response = await api.post('/auth/login', credentials);

          if (response.data?.token) {
            const { token } = response.data;
            return { token }
          }

          return false;
        } catch (error) {
          const data = error?.response?.data
          console.error('Login error', data);
          throw new Error(JSON.stringify(data))
        }

      }

    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // You can check if the user exists in your DB and handle creation
      const api = apiServerSide();

      const userProfile = createUserProfile(account, profile);
      if (userProfile) {
        try {
          const response = await api.post('/auth/social-media', userProfile);
          const token = response.data.token;

          if (token) {
            user.token = token; // Store token in user object
            return true; // Successful login
          }
        } catch (error) {
          console.error('Error during social login', error);
          return false; // Login failed
        }
      }

      return true;

    },
    async jwt({ token, user }) {
      // If the user object is available, that means we have a token
      if (user?.token) {
        token.accessToken = user.token; // Store the API token in the JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',

  }
});



const createUserProfile = (account, profile) => {
  if (account.provider === 'google') {
    return {
      credentials: {
        email: profile.email,
        google_id: profile.sub,
      },
      profile: {
        firstname: profile.given_name,
        lastname: profile.family_name,
        picture: profile.picture,
      },
    };
  }

  if (account.provider === 'facebook') {
    return {
      credentials: {
        email: profile.email,
        facebook_id: profile.id,
      },
      profile: {
        firstname: profile.name.split(' ')[0],
        lastname: profile.name.split(' ')[1],
        picture: profile.picture?.data?.url,
      },
    };
  }

  return null; // Return null if the provider is unsupported
};