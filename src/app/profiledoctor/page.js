"use client";

export default function ProfileDoctor() {
  return (
    <div className="flex h-screen">

      <div className="w-64 bg-white shadow-md p-4">
        <div className="flex items-center space-x-3 mb-6">
          <img src="Logo.svg" className="w-8 h-8" alt="Logo" />
          <h1 className="font-semibold text-lg">Doctor Esi</h1>
        </div>
        <div className="mb-6">
          <h2 className="text-gray-400 text-sm flex justify-between">
            <span>Favorites</span>
            <span className="text-gray-300">Recently</span>
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            <li className="hover:text-black cursor-pointer">• Overview</li>
            <li className="hover:text-black cursor-pointer">• Schedule</li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-gray-400 text-sm">Dashboards</h2>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <img src="default.svg" className="w-4 h-4" />
              <span>Default</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <img src="Activities.svg" className="w-4 h-4" />
              <span>Activities</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <img src="Schedule.svg" className="w-4 h-4" />
              <span>Schedule</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <img src="Something.svg" className="w-4 h-4" />
              <span>Something</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-gray-400 text-sm">Pages</h2>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li className="flex flex-col">
              <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <img src="Userp.svg" className="w-4 h-4" />
                <span>User Profile</span>
              </div>
              <ul className="pl-6 space-y-1 text-gray-500 text-xs">
                <li className="hover:text-black cursor-pointer">Overview</li>
                <li className="hover:text-black cursor-pointer">Projects</li>
                <li className="hover:text-black cursor-pointer">Campaigns</li>
                <li className="hover:text-black cursor-pointer">Documents</li>
                <li className="hover:text-black cursor-pointer">Usage</li>
              </ul>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <img src="Account.svg" className="w-4 h-4" />
              <span>Account</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <img src="Corporate.svg" className="w-4 h-4" />
              <span>Corporate</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <img src="Blog.svg" className="w-4 h-4" />
              <span>Blog</span>
            </li>
            <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <img src="Social.svg" className="w-4 h-4" />
              <span>Social</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
        </div>
        <div className="mt-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div>
              <h3 className="text-lg font-semibold">MILLIE MYERS</h3>
              <p className="text-gray-500 text-sm">DOCTORINA@ESI-SBA.DZ</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-gray-500 text-sm">Full Name</label>
              <input type="text" value="Meliani Tarek" className="w-full bg-gray-100 p-2 rounded mt-1" disabled />
            </div>
            <div>
              <label className="text-gray-500 text-sm">Phone Number</label>
              <input type="text" value="0657 63 79 49" className="w-full bg-gray-100 p-2 rounded mt-1" disabled />
            </div>
            <div>
              <label className="text-gray-500 text-sm">Email</label>
              <input type="email" value="t.meliani@esi-sba.dz" className="w-full bg-gray-100 p-2 rounded mt-1" disabled />
            </div>
            <div>
              <label className="text-gray-500 text-sm">Scolarity Year</label>
              <input type="text" value="2024/2025" className="w-full bg-gray-100 p-2 rounded mt-1" disabled />
            </div>
            <div>
              <label className="text-gray-500 text-sm">Last Available</label>
              <input type="text" value="2025-03-25 14:30" className="w-full bg-gray-100 p-2 rounded mt-1" disabled />
            </div>
            <div>
              <label className="text-gray-500 text-sm">ID</label>
              <input type="text" value="11" className="w-full bg-gray-100 p-2 rounded mt-1" disabled />
            </div>
          </div>
        </div>
      </div>
      <div className="w-80 bg-gray-50 p-4">
        <h2 className="text-lg font-semibold mb-3">Notifications</h2>
        <ul className="text-sm space-y-2">
          <li>You have a student who submitted a report - Just now</li>
          <li>Akram needs his medical history - 59 minutes ago</li>
          <li>Tarek missed his appointment - 12 hours ago</li>
        </ul>
        <h2 className="text-lg font-semibold mt-6 mb-3">Activities</h2>
        <ul className="text-sm space-y-2">
          <li>You have an appointment - Just now</li>
          <li>Bro got his appointment delayed - 59 minutes ago</li>
          <li>You have 4 profiles to review - 12 hours ago</li>
        </ul>
      </div>
    </div>
  );
}
