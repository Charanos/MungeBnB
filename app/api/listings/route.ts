import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    price,
    imageSrc,
    category,
    location,
    roomCount,
    guestCount,
    description,
    bathroomCount,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      imageSrc,
      category,
      roomCount,
      guestCount,
      description,
      bathroomCount,
      userId: currentUser.id,
      price: parseInt(price, 10),
      locationValue: location.value,
    },
  });

  return NextResponse.json(listing);
}
