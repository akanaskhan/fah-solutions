import React from 'react';
import { BsTiktok, BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import { useForm } from "react-hook-form";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";

function ContactUs() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [modal, contextHolder] = Modal.useModal();

  const onSubmit = (data) => {
    const ContactCollectionRef = collection(db, "ContactForm");
    const obj = {
      ...data,
      createdAt: serverTimestamp(),
    };
    addDoc(ContactCollectionRef, obj).then(() => {
      reset();
      showSuccessModal();
    });
  };

  const showSuccessModal = () => {
    let secondsToGo = 5;
    const instance = modal.success({
      title: 'Thanks for contacting us!',
      content: `Your feedback made our day!`,
      okButtonProps: { style: { display: 'none' } }, 
      centered: true,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `Your feedback made our day!`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  const contactData = {
    phone: "+92-302-1953486",
    email: "officialsmscents@gmail.com",
    socialMedia: [
      { platform: "Facebook", url: "https://www.facebook.com/officialsmscents", icon: <FaFacebook /> },
      { platform: "Instagram", url: "https://www.instagram.com/officialsmscents", icon: <FaInstagram /> },
      { platform: "TikTok", url: "https://www.tiktok.com/@officialsmscents", icon: <BsTiktok /> },
    ]
  };

  return (
    <div className="contact-us-container p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">Contact Us</h1>
      
      <div className="mb-8 text-center">
        <p className="text-lg"><strong>Phone:</strong> {contactData.phone}</p>
        <p className="text-lg"><strong>Email:</strong> <a href={`mailto:${contactData.email}`} className="text-blue-600">{contactData.email}</a></p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Get in Touch</h2>
        <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-sm text-red-500">This field is required</span>}
          
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-md"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-sm text-red-500">This field is required</span>}

          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded-md"
            rows="4"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && <span className="text-sm text-red-500">This field is required</span>}

          <button
            type="submit"
            className="w-full py-2 rounded-md font-semibold learn-btn transition-all"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
        <div className="flex flex-wrap justify-center space-x-4">
          {contactData.socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg hover:underline flex items-center"
            >
              <span className="mr-2">{social.icon}</span>
              {social.platform}
            </a>
          ))}
        </div>
      </div>

      {contextHolder}
    </div>
  );
}

export default ContactUs;
