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
    studentName: z.string().min(1, "Required").max(30),
    phone: z.string().length(10, "Must be 10 digits"),
    email: z.string().email("Must be a valid email"),
});

const UpdateMultipleTypes = ({ initialData, onUpdated }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extracts 'YYYY-MM-DD' from the ISO string
  };

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    // defaultValues: initialData
    defaultValues: {
      studentName: initialData.studentName,
      phone: initialData.phoneNumber,
      email: initialData.email,
      password: initialData.password,
      school: initialData.school,
      // dob: formatDate(initialData.dob),
      // studentClass: initialData.class.toString()
    }
  });

  const [showPassword, setShowPassword] = useState(false);
    
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  console.log("initialData", initialData);
  console.log("errors", errors);

  const onSubmit = async (data) => {
    console.log("data", data);

    // Construct the payload dynamically
    let payload = {
        studentName: data.studentName,
        phoneNumber: data.phone,
        email: data.email,
        // school: data.school // assuming school is still required
        // studentClass: data.studentClass,
        // studentClass: parseInt(initialData.studentClass, 10)
        // studentClass: 2
    };

    // Only add password to the payload if it's been provided
    if (data.password && data.password.trim() !== "") {
        payload.password = data.password;
    }

    console.log("Formatted data for API:", payload);

    console.log("api", `https://xcxd.online:8080/api/v1/student/updateStudent/${initialData._id}`)
    
    try {
      const response = await fetch(`https://xcxd.online:8080/api/v1/student/updateStudent/${initialData._id}`, {
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
            htmlFor="studentName"
            className={cn("", {
              "text-destructive": errors.studentName,
            })}
          >
            Student Name
          </Label>
          <Input
            type="text"
            {...register("studentName")}
            placeholder="Please enter your name"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.studentName,
            })}
          />
          {errors.studentName && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.studentName,
              })}
            >
              {errors.studentName.message}
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
