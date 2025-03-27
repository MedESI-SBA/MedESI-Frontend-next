import React from "react";

const How = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-16 space-y-10 lg:space-y-0">
      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          How It <span className="bg-gradient-to-r from-[#2E00FF] via-[#2E00FF] to-[#2FD9FF] text-transparent bg-clip-text">
              Works
            </span>{" "}
        </h2>

        <div className="space-y-5">
          <div className="flex items-start space-x-3">
            <img src="star.svg" alt="Step Icon" className="w-5 h-5 mt-1" />
            <div>
              <h3 className="text-base font-semibold">Sign Up / Login</h3>
              <p className="text-sm text-gray-600">
                Create an account in seconds and securely log in to access personalized healthcare services.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <img src="star.svg" alt="Step Icon" className="w-5 h-5 mt-1" />
            <div>
              <h3 className="text-base font-semibold">Book or Manage Appointments</h3>
              <p className="text-sm text-gray-600">
                Easily schedule, reschedule, or cancel appointments with your healthcare provider at your convenience.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <img src="star.svg" alt="Step Icon" className="w-5 h-5 mt-1" />
            <div>
              <h3 className="text-base font-semibold">Get Medical Assistance</h3>
              <p className="text-sm text-gray-600">
                Connect with doctors, receive prescriptions, and access quality medical support anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center mb-8">
        <img src="Macbook.svg" alt="Macbook" className="max-w-full h-auto" />
      </div>
    </section>
  );
};

export default How;
