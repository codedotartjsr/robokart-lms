"use client";
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
import { useState, useEffect } from "react";

// const schema = z.object({
//   firstname: z
//     .string()
//     .min(3, { message: "First name must be at least 3 charecters." })
//     .max(30, { message: "The First's name must not exceed 30 characters." }),
//   lastname: z
//     .string()
//     .min(3, { message: "Last name must be at least 3 charecters." })
//     .max(30, { message: "The Last's name must not exceed 30 characters." }),
//   phone: z.string().refine((value) => value.length === 10, {
//     message: "Phone number must be exactly 10 characters long.",
//   }),
//   city: z.string().min(3, { message: "Enter minimum 3 charecters" }),
//   web: z.string().url({ message: "Enter a valid Email address" }),
//   inputMessage: z
//     .string()
//     .max(30, { message: "Message should not be exceed 30 charecters." }),
//   state: z.string().min(1, { message: "State is required." }),
//   district: z.string().min(1, { message: "District is required." }),
//   school: z.string().min(1, { message: "School is required." }),
//   udise: z.string().min(3, { message: "UDISE must be at least 3 characters." }),
//   selectCourses: z.string().min(1, { message: "Please select at least one course." }),
//   password: z.string().min(6, { message: "Password must be at least 6 characters." }),
//   email: z.string().email({ message: "Enter a valid email address" }),
//   gender: z.string().min(1, { message: "Gender is required." }),
// });

const schema = z.object({
    studentName: z.string().min(1, "Required").max(30),
    fatherName: z.string().min(1, "Required").max(30),
    phone: z.string().length(10, "Must be 10 digits"),
    email: z.string().email("Must be a valid email"),
    password: z.string().min(1, "Required"),
    gender: z.enum(["male", "female", "others"], "Gender is required"),
    state: z.string().min(1, "Required").max(30),
    district: z.string().min(1, "Required").max(30),
    aadhar: z.string().min(1, "Required").max(30),
    studentClass: z.string().min(1, "Required").max(30),
    dob: z.string().min(1, "Required").max(30),
  });

// const schema = z.object({
//     firstname: z.string().min(3).max(30),
//     lastname: z.string().min(3).max(30),
//     phone: z.string().length(10),
//     email: z.string().email(),
//     password: z.string().min(6),
//     gender: z.string(),
// });
  

const MultipleTypes = ({ onAdded }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [schoolId, setSchoolId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.school && user.school._id) {
      setSchoolId(user.school._id);
    }
  }, []);
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   function onSubmit(data) {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-primary-foreground">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   }

const onSubmit = async (data) => {
    console.log("data", data);

    const payload = {
        studentName: data.studentName,
        fatherName: data.fatherName,
        phoneNumber: data.phone,
        email: data.email,
        password: data.password,
        gender: data.gender,
        school: schoolId,  // Assuming a static value or you can add this as a form field
        state: data.state,
        district: data.district,
        aadhar: data.aadhar,
        studentClass: data.studentClass,
        dob: data.dob
    };

    console.log("Formatted data for API:", payload);
    
    try {
      const response = await fetch('https://xcxd.online:8080/api/v1/student/addStudent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("New Principal Registered Successfully");
        reset(); // Reset form fields
        onAdded(); // Call the callback to hide the form
      } else {
        throw new Error(result.message || "Failed to add principal");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during submission");
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
            htmlFor="fatherName"
            className={cn("", {
              "text-destructive": errors.fatherName,
            })}
          >
            Father Name
          </Label>
          <Input
            type="text"
            {...register("fatherName")}
            placeholder="Please enter father name"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.fatherName,
            })}
          />
          {errors.fatherName && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.fatherName,
              })}
            >
              {errors.fatherName.message}
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
            htmlFor="aadhar"
            className={cn("", {
              "text-destructive": errors.aadhar,
            })}
          >
            Aadhar Number
          </Label>
          <Input
            type="text"
            {...register("aadhar")}
            placeholder="Please enter aadhar no"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.aadhar,
            })}
          />
          {errors.aadhar && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.aadhar,
              })}
            >
              {errors.aadhar.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="studentClass"
            className={cn("", {
              "text-destructive": errors.studentClass,
            })}
          >
            Class Name
          </Label>
          <Input
            type="text"
            {...register("studentClass")}
            placeholder="Please enter your class"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.studentClass,
            })}
          />
          {errors.studentClass && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.studentClass,
              })}
            >
              {errors.studentClass.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="dob"
            className={cn("", {
              "text-destructive": errors.dob,
            })}
          >
            Date of Birth
          </Label>
          <Input
            type="date"
            {...register("dob")}
            placeholder="Please enter your class"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.dob,
            })}
          />
          {errors.dob && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.dob,
              })}
            >
              {errors.dob.message}
            </p>
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
            htmlFor="state"
            className={cn("", {
              "text-destructive": errors.state,
            })}
          >
            State
          </Label>
          <Input
            type="text"
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

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="district"
            className={cn("", {
              "text-destructive": errors.district,
            })}
          >
            District
          </Label>
          <Input
            type="text"
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

export default MultipleTypes;