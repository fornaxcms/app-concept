import React, { FormEvent } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { Button } from "~/ui/Button";
import { Input } from "~/ui/Input";
import { Textarea } from "~/ui/Textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/Dialog";

type FormData = {
  name: string;
  description: string;
};

export const CreateProjectModal: React.FC = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate } = api.project.create.useMutation({
    async onSuccess(data) {
      router.push(`/project/${data.id}`);
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    await mutate(data);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa,
              necessitatibus.
            </DialogDescription>
          </DialogHeader>
          <div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Project Name" />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} placeholder="Project Description" />
                )}
              />
              <DialogFooter>
                <Button type="submit">Confirm</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
