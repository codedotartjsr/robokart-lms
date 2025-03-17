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
    name: z.string().min(1, "Required").max(30),
    department: z.string().min(1, "Required").max(30),
    phone: z.string().length(10, "Must be 10 digits"),
    email: z.string().email("Must be a valid email"),
    description: z.string().min(1, "Required").max(30),
});

const UpdateMultipleTypes = ({ initialData, onUpdated }) => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData.name,
      department: initialData.department,
      phone: initialData.phoneNumber,
      email: initialData.email,
      description: initialData.description
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      department: data.department,
      phoneNumber: data.phone,
      email: data.email,
      description: data.description
  };

    if (data.password && data.password.trim() !== "") {
        payload.password = data.password;
    }

    try {
      const response = await fetch(`${config.API_BASE_URL}/v1/project/updateProject/${initialData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        toast.success("Project updated successfully");
        reset();
        onUpdated();
      } else {
        throw new Error("Failed to update project");
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
            htmlFor="name"
            className={cn("", {
              "text-destructive": errors.name,
            })}
          >
            Project Name
          </Label>
          <Input
            type="text"
            {...register("name")}
            placeholder="Please enter project name"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.name,
            })}
          />
          {errors.name && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.name,
              })}
            >
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="department"
            className={cn("", {
              "text-destructive": errors.department,
            })}
          >
            Department
          </Label>
          <Input
            type="text"
            {...register("department")}
            placeholder="Please enter department name"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.department,
            })}
          />
          {errors.department && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.department,
              })}
            >
              {errors.department.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="phone"
            className={cn("", {
              "text-destructive": errors.phone,
            })}
          >
            Phone Number
          </Label>
          <Input
            type="number"
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
            htmlFor="description"
            className={cn("", {
              "text-destructive": errors.description,
            })}
          >
            Description
          </Label>
          <Input
            type="text"
            {...register("description")}
            placeholder="Please enter project description"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.description,
            })}
          />
          {errors.description && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.description,
              })}
            >
              {errors.description.message}
            </p>
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
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default UpdateMultipleTypes;
