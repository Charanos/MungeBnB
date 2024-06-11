"use client";

import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Container from "../components/Container";
import { Reservation, User } from "@prisma/client";
import ListingCard from "../components/Listings/ListingCard";

interface TripsClientProps {
  currentUser?: User | null;
  reservations: (Reservation & { listing: any })[]; // Ensure listing is included
}

const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error: any) => {
          console.error(error);
          toast.error("Unable to cancel reservation");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <div className="pt-24">
      <Container>
        <Heading center title="Trips" subtitle="Your reserved listings" />

        <div className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {reservations.map((reservation) => (
            <ListingCard
              onAction={onCancel}
              key={reservation.id}
              reservation={reservation}
              actionId={reservation.id}
              currentUser={currentUser}
              // @ts-ignore: Ignore type error for 'data'
              data={reservation.listing}
              actionLabel="Cancel Reservation"
              disabled={deletingId === reservation.id}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TripsClient;
