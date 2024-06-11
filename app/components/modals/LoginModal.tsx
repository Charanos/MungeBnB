"use client";

import axios from "axios";
import Modals from "./Modals";
import Button from "../Button";
import Heading from "../Heading";
import toast from "react-hot-toast";
import Inputs from "../inputs/Inputs";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged In");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col z-[99999] gap-4">
      <Heading
        center
        title="welcome back to mungebnb"
        subtitle="login to your account"
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
        <div className="">First time user?</div>

        <div
          onClick={toggle}
          className="uppercase text-accentColor cursor-pointer hover:underline"
        >
          create an account.
        </div>
      </div>
    </div>
  );

  return (
    <Modals
      title="login"
      body={bodyContent}
      disabled={isLoading}
      actionLabel="continue"
      footer={footerContent}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginModal;
