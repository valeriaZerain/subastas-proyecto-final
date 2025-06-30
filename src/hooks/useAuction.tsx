import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from 'uuid';

import { useAuctionStore } from "../store/auctionStore";
import type { Auction } from "../interfaces/auctionInterface";
import { deleteAuction, updateAuction, registerAuction } from "../services/Auction";

export const useAuction = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openRegisterAuction, setOpenRegisterAuction] = useState(false);
  const [editingAuction, setEditingAuction] = useState<Auction | null>(null);
  const { auctions, fetchAuctions } = useAuctionStore();

  const handleCloseOk = () => {
    handleDeleteAuction(editingAuction?.id || "");
    setEditingAuction(null);
    setOpenAlert(false);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleOpenAlert = (auction: Auction) => {
    setEditingAuction(auction);
    setOpenAlert(true);
  };
  const handleOpenRegisterAuction = () => {
    setOpenRegisterAuction(true);
  };
  const handleCloseRegisterAuction = () => {
    setOpenRegisterAuction(false);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      basePrice: 0,
      startTime: "",
      duration: 0,
      image: "",
      status: "coming",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      basePrice: Yup.number()
        .min(0, "Price must be positive")
        .required("Price is required"),
      startTime: Yup.date().required("Start time is required").min(new Date(), "Start time must be in the future"),
      duration: Yup.number()
        .min(1, "Duration must be at least 1 second")
        .required("Duration is required"),
      image: Yup.string(),
      status: Yup.string().oneOf(
        ["coming", "actual", "finished"],
        "Invalid status"
      ),
    }),
    onSubmit: async (values) => {
          try {
            if (editingAuction) {
              await updateAuction(
               editingAuction.id,
                {title: values.title,
                description: values.description,
                basePrice: values.basePrice,
                startTime: new Date(values.startTime),
                duration: values.duration,
                currentBid: values.basePrice,
                image: values.image
              });
            } else {
              await registerAuction(
                {
                  id: uuidv4(),
                  title: values.title,
                  description: values.description,
                  basePrice: values.basePrice,
                  currentBid: values.basePrice,
                  startTime: new Date(values.startTime),
                  duration: values.duration,
                  status: "coming",
                  image: values.image || "",
                }
              );
            }
            formik.resetForm();
            setEditingAuction(null);
            setOpenRegisterAuction(false);
            fetchAuctions();
          } catch (error) {
            console.error("Error saving auctions", error);
          }
        },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditAuction = (auction: Auction) => {
    setEditingAuction(auction);
    setOpenRegisterAuction(true);
  };

  const handleDeleteAuction = async (id: string) => {
    try {
      await deleteAuction(id);
      fetchAuctions();
    } catch (error) {
      console.error("Error deleting user", error);
    }
    setEditingAuction(null);
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return {
    openAlert,
    openRegisterAuction,
    handleCloseOk,
    handleCloseAlert,
    handleOpenRegisterAuction,
    handleCloseRegisterAuction,
    formik,
    handleImageUpload,
    auctions,
    handleEditAuction,
    handleOpenAlert,
  };
};
