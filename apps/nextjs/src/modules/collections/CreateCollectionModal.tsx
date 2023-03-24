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
  apiId: string;
  description: string;
};

interface CreateCollectionModalPropsI {
  projectId: string;
}

const CreateCollectionModal: React.FC<CreateCollectionModalPropsI> = ({
  projectId,
}) => {
  const router = useRouter();
  const { control, handleSubmit, getValues } = useForm<FormData>({
    defaultValues: {
      name: "",
      apiId: "",
      description: "",
    },
  });

  const { mutate } = api.collection.createCollection.useMutation({
    async onSuccess(data) {
      router.push(`/project/${projectId}/collections/${data.id}`);
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    await mutate({ projectId, ...data });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Collection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Collection Name" />
              )}
            />
            <Controller
              name="apiId"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="The ID that references this collection in the API."
                  defaultValue={getValues("name")}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea {...field} placeholder="Collection Description" />
              )}
            />
            <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionModal;
