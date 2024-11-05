import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import Moment from "react-moment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { getInitials } from "@/libs/Helpers";
import { useDispatch } from "react-redux";
import { archiveTopic, removeComment } from "@/app/redux/features/forumSlice";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";

const ViewDrawer = ({ open, onClose, selectedData }) => {
  const dispatch = useDispatch();

  const handleArchive = useCallback(() => {
    if (!selectedData) return;
    dispatch(archiveTopic({ topicId: selectedData.id, archived: true }));
    onClose();
  }, [dispatch, selectedData, onClose]);

  const handleDelete = useCallback(
    (commentId) => {
      if (!selectedData) return;
      onClose();
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Komentar yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fe9800",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            removeComment({
              topicId: selectedData.id,
              commentId: commentId,
            })
          );

          Swal.fire({
            title: "Terhapus!",
            text: "Komentar berhasil dihapus.",
            icon: "success",
            confirmButtonColor: "#fe9800",
          });
        }
      });
    },
    [dispatch, selectedData, onClose]
  );

  if (!selectedData) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 600 }} role="presentation">
        <div className="p-4">
          <div className="flex items-center justify-between py-4 px-2">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-xl font-bold">Materi Dasar Umum</h2>
                <span className="text-gray-200">Detail Forum</span>
              </div>
            </div>
            <div>
              <span className="font-bold">Close</span>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <div className="space-y-4 py-6 px-2">
            <h2 className="text-xl font-bold">{selectedData.title}</h2>
            <h4 className="flex text-[#fe9800] font-semibold">
              {selectedData.user.name}
            </h4>
            <div className="flex flex-col">
              <div className="mt-4">
                {selectedData.image_url && (
                  <Image
                    src={selectedData.image_url}
                    alt={selectedData.image_url}
                    width={104}
                    height={60}
                  />
                )}
              </div>
              <p className="my-4">{selectedData.content}</p>
              <div className="flex items-center text-gray-500 text-sm space-x-4">
                <div className="flex items-center space-x-2">
                  <button>
                    <HandThumbUpIcon className="h-5 w-5" />
                  </button>
                  <span>{selectedData.like_count}</span>
                  <button>
                    <HandThumbDownIcon className="h-5 w-5" />
                  </button>
                  <span>{selectedData.dislike_count}</span>
                </div>
                <span>
                  <Moment format="DD MMMM YYYY, HH:mm [WIB]">
                    {selectedData.created_at}
                  </Moment>
                </span>
              </div>
            </div>
          </div>

          {selectedData.comments && selectedData.comments.length > 0 ? (
            selectedData.comments.map((comment, index) => (
              <div key={index} className="space-y-4 p-8 border-y">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {getInitials(comment.user.name)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex justify-between">
                      <div className="space-x-2">
                        <span className="font-semibold text-gray-700">
                          {comment.user.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          <Moment format="DD MMMM YYYY, HH:mm [WIB]">
                            {comment.created_at}
                          </Moment>
                        </span>
                      </div>
                      <IconButton
                        color="warning"
                        size="small"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    </div>
                    <p className="text-gray-700 mb-4">{comment.content}</p>
                    <div className="flex items-center justify-between text-gray-500 my-2">
                      <div className="flex items-center space-x-2">
                        <button>
                          <HandThumbUpIcon className="h-5 w-5" />
                        </button>
                        <span>{comment.like_count}</span>
                        <button>
                          <HandThumbDownIcon className="h-5 w-5" />
                        </button>
                        <span>{comment.dislike_count}</span>
                      </div>
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
        <div className="flex justify-center mb-4">
          <button
            onClick={handleArchive}
            className="bg-[#fe9800] text-white px-12 py-2 rounded hover:bg-[#e88a00] transition-colors"
          >
            Archive
          </button>
        </div>
      </Box>
    </Drawer>
  );
};

export default ViewDrawer;
