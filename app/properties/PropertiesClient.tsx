"use client";

import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Container from "../components/Container";
import { Listing, User } from "@prisma/client";
import ListingCard from "../components/Listings/ListingCard";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing Deleted");
          router.refresh();
        })
        .catch((error: any) => {
          toast.error("Unable to delete listing");
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
        <Heading center title="Properties" subtitle="Your listed properties" />

        <div className="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing) => (
            <ListingCard
              data={listing}
              key={listing.id}
              onAction={onCancel}
              actionId={listing.id}
              currentUser={currentUser}
              actionLabel="Delete property"
              disabled={deletingId === listing.id}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PropertiesClient;
