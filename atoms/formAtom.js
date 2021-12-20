import { atom } from "recoil";

export const infoform = atom({
  key: "infoform",
  default: false,
});

export const formData = atom({
  key: "formdata",
  default: {}
})