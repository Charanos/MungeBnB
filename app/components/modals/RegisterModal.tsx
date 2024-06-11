"use client";

import axios from "axios";
import Modals from "./Modals";
import Button from "../Button";
import Heading from "../Heading";
import toast from "react-hot-toast";
import Inputs from "../inputs/Inputs";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("New account created");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Something went wrong! Try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex z-[9999] flex-col gap-4">
      <Heading
        center
        title="welcome to mungebnb"
        subtitle="create an account"
      />
      <Inputs
        required
        id="email"
        label="Email"
        errors={errors}
        register={register}
        disabled={isLoading}
      />
      <Inputs
        required
        id="name"
        label="Name"
        errors={errors}
        register={register}
        disabled={isLoading}
      />
      <Inputs
        required
        id="password"
        type="Password"
        errors={errors}
        label="Password"
        register={register}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-5">
      <hr />

      <Button
        outline
        icon={FcGoogle}
        label="Continue with Google"
        onClick={() => signIn("google")}
      />

      <Button
        outline
        icon={AiFillGithub}
        label="Continue with github"
        onClick={() => signIn("github")}
      />

      <div className="mt-4 flex items-center justify-center gap-2 font-light text-center text-textDark/80">
        <div className="">Already have an account?</div>

        <div
          onClick={toggle}
          className="uppercase text-accentColor cursor-pointer hover:underline"
        >
          login
        </div>
      </div>
    </div>
  );

  return (
    <Modals
      title="register"
      body={bodyContent}
      disabled={isLoading}
      actionLabel="continue"
      footer={footerContent}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
