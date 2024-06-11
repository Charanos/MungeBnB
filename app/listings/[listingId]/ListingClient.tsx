"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import Container from "@/app/components/Container";
import useLoginModal from "@/app/hooks/useLoginModal";
import { Listing, Reservation, User } from "@prisma/client";
import { categories } from "@/app/components/Navbar/Categories";
import ListingHead from "@/app/components/Listings/ListingHead";
import ListingInfo from "@/app/components/Listings/ListingInfo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import ListingReservation from "@/app/components/Listings/ListingReservation";

interface ListingClientProps {
  currentUser?: User | null;
  reservations?: Reservation[];
  listing: Listing & { user: User };
}

const initialDateRange = {
  key: "selection",
  endDate: new Date(),
  startDate: new Date(),
};

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const router = useRouter();
  const loginModal = useLoginModal();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        end: new Date(reservation.endDate),
        start: new Date(reservation.startDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        listingId: listing.id,
        endDate: dateRange.endDate,
        startDate: dateRange.startDate,
      })
      .then(() => {
        toast.success("Listing Reserved!");
        setDateRange(initialDateRange);
        // Redirect to /trips
        router.push("/trips");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong! Try that again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router, dateRange, listing.id, loginModal, currentUser, totalPrice]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className="w-full mx-auto pt-24">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            currentUser={currentUser}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              description={listing.description}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />

            <div className="mb-10 md:order-last order-first md:col-span-3">
              <ListingReservation
                disabled={isLoading}
                price={listing.price}
                dateRange={dateRange}
                totalPrice={totalPrice}
                onSubmit={onCreateReservation}
                disabledDates={disabledDates}
                onChangeDate={(value) => setDateRange(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
