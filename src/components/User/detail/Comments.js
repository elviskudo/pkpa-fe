"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Moment from "react-moment";
import { getInitials } from "@/libs/Helpers";
import { addComment } from "@/app/redux/features/forumSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { commentDisliked, commentLiked } from "@/app/redux/features/forumSlice";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";

export default function Comments({ topics }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      uComment: "",
      reply: "",
    },
    validationSchema: Yup.object({
      uComment: Yup.string().max(
        150,
        "Harus terdiri dari 150 karakter atau kurang"
      ),
      reply: Yup.string().max(
        150,
        "Harus terdiri dari 150 karakter atau kurang"
      ),
    }),
    onSubmit: (values) => {
      dispatch(
        addComment({
          itemId: topics.id,
          content: values.uComment || values.reply,
          userId: topics.user.id,
        })
      );
      formik.resetForm();
    },
  });

  const [activeFormIndex, setActiveFormIndex] = useState(null);
  const toggleFormVisibility = (index) => {
    setActiveFormIndex(activeFormIndex === index ? null : index);
  };

  const [likedComments, setLikedComments] = useState({});
  const [dislikedComments, setDislikedComments] = useState({});

  const handleLike = (id) => {
    setDislikedComments((prev) => ({ ...prev, [id]: false }));
    setLikedComments((prev) => ({ ...prev, [id]: !prev[id] }));
    dispatch(commentLiked({ id }));
  };

  const handleDislike = (id) => {
    setLikedComments((prev) => ({ ...prev, [id]: false }));
    setDislikedComments((prev) => ({ ...prev, [id]: !prev[id] }));
    dispatch(commentDisliked({ id }));
  };

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
            id="uComment"
            name="uComment"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.uComment}
            maxLength={150}
            className="w-full border border-gray-300 rounded-sm p-2"
            placeholder="Tinggalkan Tanggapan Baru"
          ></textarea>
          <div className="flex justify-end mt-1">
            <span
              className={`text-sm ${
                formik.values.uComment.length === 150
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {formik.values.uComment.length}/150 karakter
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
      <div className="font-semibold border-y border-gray-300 px-2 py-8">
        Tanggapan
      </div>
      {topics.comments && topics.comments.length > 0 ? (
        topics.comments.map((comment, index) => (
          <div key={index} className="space-y-6 py-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
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
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className={
                        likedComments[comment.id] || comment.like_count > 0
                          ? "text-blue-500"
                          : ""
                      }
                    >
                      <HandThumbUpIcon className="h-5 w-5" />
                    </button>
                    <span>{comment.like_count}</span>

                    <button
                      onClick={() => handleDislike(comment.id)}
                      className={
                        dislikedComments[comment.id] ||
                        comment.dislike_count > 0
                          ? "text-red-500"
                          : ""
                      }
                    >
                      <HandThumbDownIcon className="h-5 w-5" />
                    </button>
                    <span>{comment.dislike_count}</span>

                    <button
                      className="text-sm font-semibold text-gray-600"
                      onClick={() => toggleFormVisibility(index)}
                    >
                      Jawab
                    </button>
                  </div>

                  <div className="text-sm text-gray-400">
                    <Moment fromNow>{comment.created_at}</Moment>
                  </div>
                </div>

                {activeFormIndex === index && (
                  <div className="flex items-start space-x-4">
                    <form onSubmit={formik.handleSubmit} className="flex-1">
                      <textarea
                        id="reply"
                        name="reply"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.reply}
                        maxLength={150}
                        className="w-full border border-gray-300 rounded-sm p-2"
                        placeholder="Tinggalkan Tanggapan Baru"
                      ></textarea>
                      <div className="flex justify-end mt-1">
                        <span
                          className={`text-sm ${
                            formik.values.reply.length === 150
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {formik.values.reply.length}/150 karakter
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
                )}
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
