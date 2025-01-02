"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { insert } from "@/app/redux/features/forumSlice";
import { useDispatch } from "react-redux";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export default function NewForum() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        formik.setFieldError(
          "imageUpload",
          "Ukuran file terlalu besar (max 2MB)"
        );
        event.target.value = null;
        return;
      }
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        formik.setFieldError(
          "imageUpload",
          "Format file tidak didukung (*.jpeg, *.jpg, *.png)"
        );
        event.target.value = null;
        return;
      }
      formik.setFieldValue("imageUpload", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = (e) => {
    e.preventDefault();
    setImagePreview(null);
    formik.setFieldValue("imageUpload", null);
    const fileInput = document.getElementById("imageUpload");
    if (fileInput) fileInput.value = "";
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      discussionFor: "",
      title: "",
      content: "",
      imageUpload: null,
    },
    validationSchema: Yup.object({
      discussionFor: Yup.string().required("Wajib Memilih !"),
      title: Yup.string().required("Judul Postingan Wajib Diisi !"),
      content: Yup.string()
        .max(150, "Harus terdiri dari 150 karakter atau kurang")
        .required("Isi Postingan Wajib Diisi !"),
      imageUpload: Yup.mixed()
        .nullable()
        .test("fileSize", "Ukuran file terlalu besar (max 2MB)", (value) => {
          if (!value) return true;
          return value.size <= MAX_FILE_SIZE;
        })
        .test(
          "fileFormat",
          "Format file tidak didukung (*.jpeg, *.jpg, *.png)",
          (value) => {
            if (!value) return true;
            return SUPPORTED_FORMATS.includes(value.type);
          }
        ),
    }),
    onSubmit: (values) => {
      // console.log("Form Values:", values);
      // formik.resetForm();
      // setImagePreview(null);
      dispatch(
        insert({
          discussionFor: values.discussionFor,
          title: values.title,
          content: values.content,
        })
      );
    },
  });

  return (
    <div className="bg-white p-8 w-full">
      <h3 className="text-md font-semibold mb-2">Tambah Diskusi Baru</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="discussionFor"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Diskusi Untuk <span className="text-red-500">*</span>
          </label>
          <select
            id="discussionFor"
            name="discussionFor"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.discussionFor}
            className="font-semibold block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          >
            <option value="">Pilih Kategori</option>
            <option value="dosen">Dosen</option>
            <option value="mahasiswa">Mahasiswa</option>
            <option value="lainnya">Lainnya</option>
          </select>
          {formik.touched.discussionFor && formik.errors.discussionFor && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.discussionFor}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Judul Postinganmu <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            placeholder="Masukkan judul"
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.title}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Isi Postinganmu <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              id="content"
              name="content"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
              maxLength={150}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="Masukkan isi"
              rows="4"
            ></textarea>
            <div className="flex justify-end mt-1">
              <span
                className={`text-sm ${
                  formik.values.content.length === 150
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {formik.values.content.length}/150 karakter
              </span>
            </div>
            {formik.touched.content && formik.errors.content && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.content}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-col items-center justify-center w-full">
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-gray-700 mb-1 self-start"
            >
              Upload Gambar (Opsional)
            </label>
            <label
              htmlFor="imageUpload"
              className="w-80 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 relative"
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              ) : (
                <>
                  <p className="text-gray-500 mt-2">Klik untuk upload</p>
                  <p className="text-sm text-gray-400">
                    Maksimum 2 MB, Format : *.jpeg, *.jpg, *.png
                  </p>
                </>
              )}
              <input
                id="imageUpload"
                name="imageUpload"
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
              />
            </label>

            {imagePreview && (
              <button
                type="button"
                className="mt-2 text-red-500 flex items-center hover:underline"
                onClick={removeSelectedImage}
              >
                <XCircleIcon className="h-5 w-5 mr-1" />
                Hapus Gambar
              </button>
            )}

            {formik.touched.imageUpload && formik.errors.imageUpload && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.imageUpload}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#fe9800] text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-[#e88a00] transition-colors"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
