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
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

function Utilisateurs({ utilisateurs = [] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
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
            <TableRow key={utilisateur.id}>
              <TableCell>{utilisateur.profile?.firstname}</TableCell>
              <TableCell>{utilisateur.profile?.lastname}</TableCell>
              <TableCell>{utilisateur.credentials.email}</TableCell>
              <TableCell>{utilisateur.createdAt}</TableCell>
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
                  <ActionDetele utilisateur={utilisateur} />
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
export default Utilisateurs;

export const getServerSideProps = async (context) => {
  return {
    props: {
      utilisateurs: [
        {
          id: 1,
          profile: {
            firstname: 'Adlen',
            lastname: 'Gharbi',
          },
          credentials: {
            email: 'adlen025@gmail.com',
          },
          createdAt: '25-05-2024',
        },
      ],
    },
  };
};

const ActionDetele = ({ utilisateur }) => {
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
            {utilisateur.profile.firstname} {utilisateur.profile.lastname}
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
