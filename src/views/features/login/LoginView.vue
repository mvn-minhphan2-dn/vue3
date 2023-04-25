<template>
  <section class="flex items-center justify-center h-screen">
    <Form
      :validation-schema="validationSchema"
      @submit="onSubmit"
      class="w-[20%]"
    >
      <fieldset class="flex flex-col mb-5">
        <Field
          name="identifier"
          type="text"
          :class="inputClass"
          :validateOnBlur="true"
          :validateOnChange="true"
          :validateOnInput="false"
          placeholder="identifier"
        />
        <ErrorMessage name="identifier" :class="errorClass" />
      </fieldset>

      <fieldset class="flex flex-col">
        <Field
          name="password"
          type="password"
          :class="inputClass"
          placeholder="password"
        />
        <ErrorMessage name="password" :class="errorClass" />
      </fieldset>

      <button class="p-3 mt-10 font-extrabold text-red-400 bg-orange-300">
        Submit
      </button>
    </Form>
    <!-- <GoogleLogin :callback="callback" prompt auto-login /> -->
    <!-- <button @click="loginGG">Login Using Google</button> -->
  </section>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { defineComponent } from "vue";
import { toFormValidator } from "@vee-validate/zod";
import * as zod from "zod";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { googleTokenLogin } from "vue3-google-login";

const inputClass = "outline-0 px-2 text-purple-800 p-1 border";
const errorClass = "text-red-500 font-extrabold";

const validationSchema = toFormValidator(
  zod.object({
    identifier: zod.string().nonempty("This is required"),
    password: zod
      .string()
      .nonempty("This is required")
      .min(3, { message: "Too short" }),
  })
);
export default defineComponent({
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const queryClient = useQueryClient();
    const { login, saveTokenStore } = useAuthStore();

    const loginGG = () => {
      googleTokenLogin().then((response) => {
        const access_token = response.access_token;
        saveTokenStore(access_token);
      });
    };

    const { mutateAsync } = useMutation({
      mutationFn: (user) => login(user),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["guestBook"] });
      },
    });
    const onSubmit = async (values: any) => {
      try {
        await mutateAsync(values);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      onSubmit,
      validationSchema,
      inputClass,
      errorClass,
      loginGG,
    };
  },
});
</script>
