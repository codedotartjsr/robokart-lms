"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { SiteLogo } from "@/components/svg";
import { useMediaQuery } from "@/hooks/use-media-query";
import config from "@/config/config";

const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});
const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // const onSubmit = async (data) => {
  //   startTransition(async () => {
  //     try {
  //       console.log("Logging in with:", data.email, data.password);
  
  //       const response = await fetch(
  //         // "https://em4wuex6mh.ap-south-1.awsapprunner.com/api/auth/login",
  //         // `${config.API_BASE_URL}/auth/login`,
  //         "https://xcxd.online:8080/api/v1/auth/login",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Accept": "application/json",
  //           },
  //           body: JSON.stringify({
  //             email: data.email,
  //             password: data.password,
  //           }),
  //         }
  //       );
  
  //       if (!response.ok) {
  //         const errorResponse = await response.json();
  //         throw new Error(errorResponse.message || "Login failed");
  //       }
  
  //       const result = await response.json();
  //       console.log("Login successful:", result);
  
  //       localStorage.setItem("authToken", result.token);
  //       localStorage.setItem("user", JSON.stringify(result.user));
  
  //       toast.success("Login Successful!");
  //       window.location.href = "/dashboard";
  
  //       reset(); // Reset form after login
  //     } catch (error) {
  //       console.error("Login error:", error);
  //       toast.error(error.message || "Network error. Please try again.");
  //     }
  //   });
  // };
  
  const onSubmit = async (data) => {
    startTransition(async () => {
      try {
        console.log("Logging in with:", data.email, data.password);
  
        const response = await fetch(
          "https://xcxd.online:8080/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          }
        );
  
        const result = await response.json();
  
        if (response.ok && result.success) {
          console.log("Login successful:", result);
  
          // ✅ Store token and user details in localStorage
          localStorage.setItem("authToken", result.data.token);
          // localStorage.setItem("user", JSON.stringify({
          //   _id: result.data._id,
          //   firstName: result.data.firstName,
          //   lastName: result.data.lastName,
          //   email: result.data.email,
          //   phoneNumber: result.data.phoneNumber,
          //   role: result.data.role,
          //   gender: result.data.gender,
          //   createdAt: result.data.createdAt,
          //   updatedAt: result.data.updatedAt,
          //   school: result.data.school
          // }));

          localStorage.setItem("user", JSON.stringify(result.data));
  
          toast.success("Login Successful!");
  
          // Redirect manually to the correct dashboard page
          window.location.href = "/dashboard";
  
          reset(); // Reset form after login
        } else {
          // Handle possible success false or other API related errors
          throw new Error(result.msg || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.message || "Network error. Please try again.");
      }
    });
  };
  
  return (
    <div className="w-full ">
      <Link href="/dashboard" className="inline-block">
        <SiteLogo className="h-10 w-10 2xl:w-14 2xl:h-14 text-primary" />
      </Link>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Hey, Hello 👋
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        Enter the information you entered while registering.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 2xl:mt-7">
        <div className="relative">
          <Input
            removeWrapper
            type="email"
            id="email"
            size={!isDesktop2xl ? "xl" : "lg"}
            placeholder=" "
            disabled={isPending}
            {...register("email")}
            className={cn("peer", {
              "border-destructive": errors.email,
            })}
          />
          <Label
            htmlFor="email"
            className="rounded-md absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2
               peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
               peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Email
          </Label>
        </div>
        {errors.email && (
          <div className=" text-destructive mt-2">{errors.email.message}</div>
        )}
        <div className="relative mt-6">
          <Input
            removeWrapper
            type={passwordType === "password" ? "password" : "text"}
            id="password"
            size={!isDesktop2xl ? "xl" : "lg"}
            placeholder=" "
            disabled={isPending}
            {...register("password")}
            className={cn("peer", {
              "border-destructive": errors.password,
            })}
          />
          <Label
            htmlFor="password"
            className={cn(
              "rounded-md absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
              {
                " text-sm ": isDesktop2xl,
              }
            )}
          >
            Password
          </Label>
          <div
            className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
            onClick={togglePasswordType}
          >
            {passwordType === "password" ? (
              <Icon icon="heroicons:eye" className="w-4 h-4 text-default-400" />
            ) : (
              <Icon
                icon="heroicons:eye-slash"
                className="w-4 h-4 text-default-400"
              />
            )}
          </div>
        </div>

        {errors.password && (
          <div className=" text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <div className="mt-5  mb-6 flex flex-wrap gap-2">
        </div>
        <Button
          className="w-full"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default LogInForm;
