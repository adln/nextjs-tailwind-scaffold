import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { apiServerSide, getToken } from '@/lib/api';
import { Edit, Trash2 } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function Utilisateurs({ utilisateurs = [] }) {
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead column="profile.firstname" order={-1}>
            First name
          </TableHead>
          <TableHead column="profile.lastname">Last name</TableHead>
          <TableHead column="credentials.email">Email</TableHead>
          <TableHead column="createdAt">Created At</TableHead>
          <TableHead className="w-auto">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {utilisateurs.length === 0 ? (
          <TableRow>
            <TableCell colSpan="4">Aucune donnée disponible</TableCell>
          </TableRow>
        ) : (
          utilisateurs.map((utilisateur) => (
            <TableRow key={utilisateur._id}>
              <TableCell>{utilisateur.profile?.firstname}</TableCell>
              <TableCell>{utilisateur.profile?.lastname}</TableCell>
              <TableCell>{utilisateur.credentials?.email}</TableCell>
              <TableCell className="capitalize">
                {moment(utilisateur.createdAt).format('HH:mm:ss')}
                <br />
                {moment(utilisateur.createdAt).format('dddd DD-MM-YYYY')}
              </TableCell>
              <TableCell className="w-auto">
                <div className="flex gap-2 ">
                  <Button asChild variant="link" size="icon">
                    <Link
                      href={`/utilisateurs/${utilisateur.id}`}
                      data-testid="edit-button"
                    >
                      <Edit role="img" />
                    </Link>
                  </Button>
                  <ActionDelete utilisateur={utilisateur} />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
Utilisateurs.title = 'Utilisateurs';
Utilisateurs.has_search = true;
export default Utilisateurs;

export const getServerSideProps = async (context) => {
  const token = getToken(context);
  const { sort, order, q } = context.query;

  try {
    const api = apiServerSide(token);
    const utilisateurs = await api.get('/users', {
      params: {
        ...(q ? {search: q} : null),
        sort: sort || 'firstname', 
        order: order || 'asc', 
      },
    });
    return {
      props: {
        utilisateurs: utilisateurs.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch data',
      },
    };
  }
};

const ActionDelete = ({ utilisateur }) => {
  const [open, setOpen] = useState(false);
  const onConfirm = () => {
    alert('Supprimé avec succés.');
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          data-testid="delete-button"
          className="text-destructive"
          size="icon"
          variant="link"
        >
          <Trash2 role="img" />
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="dialog">
        <DialogHeader>
          <DialogTitle>
            Etes vous sure de vouloir supprimer l'utilisateur{' '}
            {utilisateur.profile?.firstname} {utilisateur.profile?.lastname}
          </DialogTitle>
          <DialogDescription>Cette action est irrévérsible.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Annuler</DialogClose>
          <Button onClick={onConfirm}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
