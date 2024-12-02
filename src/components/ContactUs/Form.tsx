"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import InputField from "@/components/ContactUs/InputField";
import TextArea from "@/components/ContactUs/TextArea";
import Dropdown from "@/components/shared/common/dropdown/index";
import JobDropdown from "@/components/shared/common/JobDropdown/index";
import { PiArrowUpRightBold } from "react-icons/pi";
import MessageSentModal from "./MessageSentModal";
import ReCAPTCHA from "react-google-recaptcha";
import countries from "./countries.json";
import { SendMessageAction } from "@/actions/contact-us/send-message-action";
import { toast } from "sonner";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  country: string;
  jobRole?: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  country?: string;
  recaptcha?: string;
  jobRole?: string;
}

const jobRole = [
  "Accountant / Contoller",
  "Administrative / Assistant",
  "Analyst",
  "Application Developer",
  "Application Owner",
  "Back Office",
  "Brocker",
  "Business Development / Sales",
  "Business Manager",
  "Capital Markets",
  "Cash Manager",
  "Chief Compliance Officer",
  "Chief Data Officer",
  "Chief Exectuive Officer",
  "Chief Financial Officer",
  "Chief Information Officer",
  "Chief Investment Officer",
  "Chief of Staff",
  "Chief Operation Officer",
  "Chief Risk Officer",
  "Chief Sustaninability Officer",
  "Chief Technology Officer",
  "Client Serviecs",
  "Collateral Management",
  "Compliance",
  "Consultant",
  "Control Owner",
  "Corporate Access",
  "Corporate Communications",
  "Corporate Development",
  "Corporate Finance",
  "Desk Head",
  "Development / Fundraiser",
  "Economist",
  "Engineer",
  "Enterprise Achitect",
  "Executive Officer",
  "Faculty",
  "Financial Advisor",
  "Global Head",
  "Government Affairs",
  "Government Contracting",
  "Government Official",
  "Head of Digital",
  "Insurance Underwriter",
  "Intern",
  "Investment Banker",
  "Investor Relations",
  "Lawyer",
  "Loan Officer",
  "Market Data / Technology",
  "Market Maker",
  "Marketing",
  "Media",
  "Middle Office",
  "News Editor",
  "Originator",
  "Portfolio Manager",
  "Prime Broker",
  "Private Banker",
  "Private Equity",
  "Procurement",
  "Product Control",
  "Product Manager",
  "Professor",
  "Project Manager",
  "Proprietary Trader",
  "Quant",
  "Recruiter",
  "Regional Head",
  "Registered Investment Advisor",
  "Regulatory Reporting",
  "Research Admin",
  "Research Sales",
  "Risk Manager",
  "Sales Assistant / Trading Assistant",
  "Sales Support",
  "Sales Trader",
  "Salesperson",
  "Securities Lending",
  "Settlements",
  "Strategist",
  "Structurer",
  "Student",
  "Syndicator",
  "System Administrator",
  "Technical Support",
  "Technology",
  "Trade Support",
  "Trader",
  "Treasurer",
  "Venture Capitalist",
  "Not Applicable",
]

const Form: React.FC = () => {
  const [messageModal, setMessageSentModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    country: "",
  });

  const closeMessageModal = () => {
    setMessageSentModal(false);
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!recaptchaToken) newErrors.recaptcha = "Please verify the captcha";

    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCountrySelect = (country: string) => {
    setFormData((prevData) => ({ ...prevData, country }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await SendMessageAction({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          country: formData.country,
          message: formData.message,
        });
        if (response.success) {
          setMessageSentModal(true);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            message: "",
            country: "",
          });
          setRecaptchaToken(null);
        } else {
          toast.error("Failed to send the message");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("An error occurred while sending the message");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = messageModal ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [messageModal]);

  return (
    <>
      <div className="dark:bg-bg bg-white rounded-xl p-6 xl:w-4/5 w-full max-w-xl mx-auto">
        <h1 className="xl:text-[2.25rem] lg:text-3xl md:text-[2.25rem] font-semibold dark:text-secondary text-bg leading-10">
          Let{`'`}s Connect!
        </h1>
        <p className="text-sm xxl:text-base dark:text-[#C5C5C5] text-bg pt-2">
          Have a question or need more information? <br />
          Submit your details below, and we{`'`}ll be in touch soon.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-row gap-x-6">
            <div className="flex-1">
              <InputField
                placeholder={"* First Name"}
                type={"text"}
                name={"firstName"}
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
            </div>
            <div className="flex-1">
              <InputField
                placeholder={"* Last Name"}
                type={"text"}
                name={"lastName"}
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>
          </div>
          <div className="my-4">
            <InputField
              placeholder={"* Email"}
              type={"email"}
              name={"email"}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
          <Dropdown
            items={countries.map((country: any) => country.name)}
            className="w-full"
            onSelect={handleCountrySelect}
            initialName=""
            error={errors.country}
          />
          <JobDropdown
            items={jobRole.map((jobs: any) => jobs)}
            className="w-full"
            onSelect={handleCountrySelect}
            initialName=""
            error={errors.jobRole}
          />
          <div className="mt-4 pb-2">
            <TextArea
              placeholder={"* Your Message"}
              name={"message"}
              value={formData.message}
              rows={4}
              cols={30}
              onChange={handleChange}
              error={errors.message}
            />
          </div>
          <div className="flex flex-row items-start">
            <p className="dark:text-[#9aa3af] text-bg text-lg font-medium -mt-1">
              *
            </p>
            <p className="dark:text-[#9aa3af] text-bg text-sm font-medium pl-1">
              Required Field
            </p>
          </div>
          <ReCAPTCHA
            sitekey={"6LeFulwqAAAAAJlNaynNUy2kQqifmzt_hXYAGwIP"}
            onChange={handleRecaptchaChange}
            className="mt-6 !w-full !ml-1"
          />
          {errors.recaptcha && (
            <p className="text-red-600 text-sm">{errors.recaptcha}</p>
          )}
          <div className="ml-1 bg-gradient-to-b dark:from-[#00FEB5] from-[#00BF88] dark:to-[#78CEF4] to-[#8EC8F0] rounded-xl p-[1px] mt-6 group">
            <button
              type="submit"
              disabled={loading}
              className={`flex flex-row gap-x-4 px-4 dark:text-primary text-darkGreen text-xl font-bold py-2.5 justify-center items-center rounded-xl dark:bg-bg bg-[#f5f5f5] w-full
                group-hover:text-bg group-hover:bg-gradient-to-b group-hover:dark:from-[#00FEB5] group-hover:dark:to-[#78CEF4] group-hover:from-[#00BF88] group-hover:to-[#8EC8F0]`}
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 101"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="inline w-6 h-6 text-secondary animate-spin fill-primary group-hover:text-bg"
                  >
                    <path
                      fill="currentColor"
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    />
                    <path
                      fill="currentFill"
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    />
                  </svg>
                  <span className="sr-only">Loading...!</span>
                </div>
              ) : (
                <>
                  Send{" "}
                  <PiArrowUpRightBold className="dark:text-primary text-[#00A475] group-hover:rotate-0 rotate-45 group-hover:text-bg" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <MessageSentModal isOpen={messageModal} onClose={closeMessageModal} />
    </>
  );
};

export default Form;
