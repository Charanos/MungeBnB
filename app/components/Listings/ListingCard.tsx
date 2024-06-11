"use client";

import Image from "next/image";
import Button from "../Button";
import { format } from "date-fns";
import HeartButton from "../HeartButton";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";

interface ListingCardProps {
  data: Listing;
  actionId?: string;
  disabled?: boolean;
  actionLabel?: string;
  reservation?: Reservation;
  currentUser?: User | null;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  currentUser,
  reservation,
  actionId = "",
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const end = new Date(reservation.endDate);
    const start = new Date(reservation.startDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square rounded-xl relative w-full overflow-hidden">
          <Image
            fill
            alt="listing"
            src={data.imageSrc}
            className="w-full h-full object-cover transition group-hover:scale-110"
          />

          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="font-semibold font-secondaryFont text-lg">
          {location?.region}, {location?.label}
        </div>

        <div className="font-light text-betaColor">
          {reservationDate || data.category}
        </div>

        <div className="flex flex-row text-secondaryColor items-center gap-1">
          <div className="font-semibold ">$ {price}</div>

          {!reservation && <div className="font-light">/ night</div>}
        </div>

        {onAction && actionLabel && (
          <Button
            small
            outline
            label={actionLabel}
            disabled={disabled}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
