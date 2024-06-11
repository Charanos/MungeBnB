import FavoritesClient from "./FavoritesClient";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavoriteListings";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListing();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Liked Listings"
        subtitle="Like a listing to add it to your favorites"
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
