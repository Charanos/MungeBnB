import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  console.log(currentUser);

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { endDate, listingId, startDate, totalPrice } = body;

  if (!listingId || !totalPrice || !endDate || !startDate) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          endDate,
          startDate,
          totalPrice,
          userId: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
