// UpdateMultipleTypes.js
"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { toast } from "@/components/ui/use-toast";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import BasicSelect from "./basic-select";
import { Icon } from '@iconify/react';
import { useState } from "react";

const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phoneNumber: z.string().length(10),
    email: z.string().email(),
    // password: z.string().min(6),
    gender: z.enum(["male", "female", "others"]),
    school: z.string(), // Assuming school ID is necessary and static
});

const UpdateMultipleTypes = ({ initialData, onUpdated }) => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    // defaultValues: initialData
    defaultValues: {
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      phoneNumber: initialData.phoneNumber,
      email: initialData.email,
      password: initialData.password,
      gender: initialData.gender,
      school: initialData.school
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  console.log("initialData", initialData);
  

  const onSubmit = async (data) => {
    console.log("data", data);

    // Construct the payload dynamically
    let payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        gender: data.gender,
        school: data.school // assuming school is still required
    };

    // Only add password to the payload if it's been provided
    if (data.password && data.password.trim() !== "") {
        payload.password = data.password;
    }

    console.log("Formatted data for API:", payload);
    
    try {
      const response = await fetch(`https://xcxd.online:8080/api/v1/principal/updatePrincipal/${initialData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        toast.success("Principal updated successfully");
        reset();
        onUpdated();
      } else {
        throw new Error("Failed to update principal");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="firstName"
            className={cn("", {
              "text-destructive": errors.firstName,
            })}
          >
            First Name
          </Label>
          <Input
            type="text"
            {...register("firstName")}
            placeholder="Please enter first name"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.firstName,
            })}
          />
          {errors.firstName && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.firstName,
              })}
            >
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="lastName"
            className={cn("", {
              "text-destructive": errors.lastName,
            })}
          >
            Last Name
          </Label>
          <Input
            type="text"
            {...register("lastName")}
            placeholder="Please enter last name"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.lastName,
            })}
          />
          {errors.lastName && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.lastName,
              })}
            >
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="phoneNumber"
            className={cn("", {
              "text-destructive": errors.phoneNumber,
            })}
          >
            Phone Number
          </Label>
          <Input
            type="number"
            placeholder="10 charecters phone number"
            {...register("phoneNumber")}
            className={cn("", {
              "border-destructive focus:border-destructive": errors.phoneNumber,
            })}
          />
          {errors.phoneNumber && (
            <p className="text-xs text-destructive">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className={cn("", {
              "text-destructive": errors.email,
            })}
          >
            Email Address
          </Label>
          <Input
            type="email"
            {...register("email")}
            placeholder="enter valid email address"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.email,
            })}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="gender"
            className={cn("", {
              "text-destructive": errors.gender,
            })}
          >
            Gender
          </Label>
          {/* <BasicSelect {...register("gender")} /> */}
          <BasicSelect control={control} name="gender" />

          {errors.gender && (
            <p className="text-xs text-destructive">{errors.gender.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className={cn("", {
              "text-destructive": errors.password,
            })}
          >
            Password
          </Label>
          <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Please enter valid password"
            {...register("password")}
            className={cn("", {
              "border-destructive": errors.password,
            })}
          />
          <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
            >
              <Icon icon={showPassword ? "heroicons-outline:eye-off" : "heroicons-outline:eye"} className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

      </div>
      <div className="mt-4">
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
};

export default UpdateMultipleTypes;
