"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { InputDropdown } from "@/modules/quiz/create/components/InputDropdown"
import { useForm, Controller, UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { categories, difficulties } from "./constant";
import DOMPurify from "dompurify";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EditQuizFormInterface } from "./interface";
import { axiosInstance } from "@/lib/utils";

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    difficulty: z.string().min(1, "Difficulty is required"),
});


export const EditQuizForm = ({quiz}:EditQuizFormInterface) => {
  const router = useRouter()
  

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues : {
        title: quiz.title,
        description: quiz.description,
        category: quiz.category,
        difficulty:quiz.difficulty
    }
  });

  const onSubmit = async (data: any) => {
    const {title, description, category, difficulty} = data
    const sanitizedInput = {
      title: DOMPurify.sanitize(title),
      description: DOMPurify.sanitize(description),
      category: DOMPurify.sanitize(category),
      difficulty: DOMPurify.sanitize(difficulty),
    }
    const response = await axiosInstance.put(`/api/quiz/${quiz.id}/`,sanitizedInput)
    const result = response.data
    if(result.status == "success") {
      toast.success("Quiz saved")
      router.push("/quiz")
    } else {
      if(result.message == "Quiz title already exists") {
        toast.error(result.message)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label>Quiz Title</label>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Enter Quiz Title" />
        )}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <label>Description</label>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Description"   />
        )}
      />
      {errors.description && <p className="text-red-500">{errors.description.message}</p>}

      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="flex flex-col gap-1 w-full">
          <label>Category</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <InputDropdown
                options={categories}
                title="Category"
                val={quiz.category}
              />
            )}
          />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label>Difficulty</label>
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <InputDropdown
                options={difficulties}
                title="Difficulty"
                val={quiz.difficulty}
              />
            )}
          />
          {errors.difficulty && <p className="text-red-500">{errors.difficulty.message}</p>}
        </div>
      </div>
      <Button className="w-min bg-mainpink font-semibold hover:bg-hoverpink" type="submit">Save</Button>
    </form>
  );
};