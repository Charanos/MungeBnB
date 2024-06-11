"use client";

import Heading from "../components/Heading";
import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import ListingCard from "../components/Listings/ListingCard";

interface FavoritesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <div className="pt-24">
        <Heading
          center
          title="Favorites"
          subtitle="All your favorite listings"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            key={listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
