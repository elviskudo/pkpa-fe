"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Moment from "react-moment";
import { getInitials } from "@/libs/Helpers";
import { addComment } from "@/app/redux/features/forumSlice";
import { useDispatch } from "react-redux";

export default function Comments({ topics }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      user_comment: "",
    },
    validationSchema: Yup.object({
      user_comment: Yup.string().max(
        150,
        "Harus terdiri dari 150 karakter atau kurang"
      ),
    }),
    onSubmit: (values) => {
      dispatch(
        addComment({
          itemId: topics.id,
          content: values.user_comment,
          userId: topics.user.id,
        })
      );
      formik.resetForm();
    },
  });
  return (
    <div>
      <div className="flex items-start space-x-4 my-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">
              {getInitials(topics.user.name)}
            </span>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex-1">
          <textarea
            id="user_comment"
            name="user_comment"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.user_comment}
            maxLength={150}
            className="w-full border border-gray-300 rounded-sm p-2"
            placeholder="Tinggalkan Tanggapan Baru"
          ></textarea>
          <div className="flex justify-end mt-1">
            <span
              className={`text-sm ${
                formik.values.user_comment.length === 150
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {formik.values.user_comment.length}/150 karakter
            </span>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              type="button"
              onClick={formik.resetForm}
              className="border border-[#fe9800] text-[#fe9800] px-12 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#fe9800] text-white px-12 py-2 rounded"
            >
              Posting
            </button>
          </div>
        </form>
      </div>
      <div class="font-semibold border-y border-gray-300 px-2 py-8">
        Tanggapan
      </div>
      {topics.comments && topics.comments.length > 0 ? (
        topics.comments.map((comment, index) => (
          <div key={index} className="space-y-6 py-4">
            <div className="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold">
                    {getInitials(comment.user.name)}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-2 flex-1 space-x-2">
                  <span className="font-semibold text-gray-700">
                    {comment.user.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    <Moment format="DD MMMM YYYY, HH:mm [WIB]">
                      {comment.created_at}
                    </Moment>
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{comment.content}</p>

                <div className="flex items-center justify-between text-gray-500 my-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z" />
                      </svg>
                      <span>{comment.like_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path d="M18.905 12.75a1.25 1.25 0 1 1-2.5 0v-7.5a1.25 1.25 0 0 1 2.5 0v7.5ZM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 0 1 5.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.243 0-2.261-1.01-2.146-2.247.193-2.08.651-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 0 1 1.341.317l2.734 1.366A3 3 0 0 0 13.613 5h1.292v7h-.963c-.685 0-1.258.482-1.612 1.068a4.01 4.01 0 0 1-2.166 1.73c-.432.143-.853.386-1.011.814-.16.432-.248.9-.248 1.388Z" />
                      </svg>
                      <span>{comment.dislike_count}</span>
                    </div>
                    <button className="text-sm font-semibold text-gray-600">
                      Jawab
                    </button>
                  </div>
                  <div className="text-sm text-gray-400">
                    <Moment fromNow>{comment.created_at}</Moment>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <form onSubmit={formik.handleSubmit} class="flex-1">
                    <textarea
                      id="user_comment"
                      name="user_comment"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.user_comment}
                      maxLength={150}
                      class="w-full border border-gray-300 rounded-sm p-2"
                      placeholder="Tinggalkan Tanggapan Baru"
                    ></textarea>
                    <div className="flex justify-end mt-1">
                      <span
                        className={`text-sm ${
                          formik.values.user_comment.length === 150
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {formik.values.user_comment.length}/150 karakter
                      </span>
                    </div>
                    <div class="mt-4 flex space-x-2">
                      <button
                        type="button"
                        onClick={formik.resetForm}
                        class="border border-[#fe9800] text-[#fe9800] px-12 py-2 rounded"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="bg-[#fe9800] text-white px-12 py-2 rounded"
                      >
                        Posting
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="flex items-center justify-center text-gray-700 my-4">
          Tidak Ada Komentar
        </p>
      )}
    </div>
  );
}
