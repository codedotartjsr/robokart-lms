"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Icon } from '@iconify/react';
import { useState } from "react";
import config from "@/config/config";

const schema = z.object({
  schoolname: z.string().min(1, "Required").max(30),
  phone: z.string().length(10, "Must be 10 digits"),
  email: z.string().email("Must be a valid email"),
  state: z.string().min(1, "Required").max(30),
  district: z.string().min(1, "Required").max(30),
});

const UpdateMultipleTypes = ({ initialData, onUpdated }) => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      schoolname: initialData.name,
      lastName: initialData.lastName,
      phone: initialData.phone_no,
      email: initialData.email,
      password: initialData.password,
      state: initialData.state,
      district: initialData.district,
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);  

  const onSubmit = async (data) => {
    let payload = {
        name: data.schoolname,
        phone_no: data.phone,
        email: data.email,
        state: data.state,
        district: data.district,
    };

    if (data.password && data.password.trim() !== "") {
        payload.password = data.password;
    }

    try {
      const response = await fetch(`${config.API_BASE_URL}/v1/school/updateSchool/${initialData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        toast.success("School updated successfully");
        reset();
        onUpdated();
      } else {
        throw new Error("Failed to update school");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="flex flex-col gap-2 mb-2 lg:mr-4">
          <Label
            htmlFor="schoolname"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.schoolname,
            })}
          >
            School Name
          </Label>
          <Input
            type="text"
            size="lg"
            {...register("schoolname")}
            placeholder="Please enter school name"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.schoolname,
            })}
          />
          {errors.schoolname && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.schoolname,
              })}
            >
              {errors.schoolname.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:ml-4">
          <Label
            htmlFor="phone"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.phone,
            })}
          >
            Phone Number
          </Label>
          <Input
            type="number"
            size="lg"
            placeholder="10 charecters phone number"
            {...register("phone")}
            className={cn("", {
              "border-destructive focus:border-destructive": errors.phone,
            })}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:mr-4">
          <Label
            htmlFor="email"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.email,
            })}
          >
            Email Address
          </Label>
          <Input
            type="email"
            size="lg"
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

        <div className="flex flex-col gap-2 mb-2 lg:ml-4">
          <Label
            htmlFor="state"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.state,
            })}
          >
            State
          </Label>
          <Input
            type="text"
            size="lg"
            {...register("state")}
            placeholder="Please enter your state"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.state,
            })}
          />
          {errors.state && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.state,
              })}
            >
              {errors.state.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:mr-4">
          <Label
            htmlFor="district"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.district,
            })}
          >
            District
          </Label>
          <Input
            type="text"
            size="lg"
            {...register("district")}
            placeholder="Please enter your district"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.district,
            })}
          />
          {errors.district && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.district,
              })}
            >
              {errors.district.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:ml-4">
          <Label
            htmlFor="password"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.password,
            })}
          >
            Password
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              size="lg"
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
      <div className="mt-4 mt-2 mb-2 ml-1">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default UpdateMultipleTypes;
