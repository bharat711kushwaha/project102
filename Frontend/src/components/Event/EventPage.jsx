import React, { useState } from "react";

function EventCard({
  title,
  date,
  location,
  description,
  image,
  user,
  isExpired,
  deadline,
  onRegister,
}) {
  return (
    <div className="max-w-lg w-full sm:mx-auto mx-2 border border-neutral-700 rounded-lg shadow-md bg-neutral-800">
      {/* Event Header */}
      <div className="flex justify-between items-center p-4 bg-neutral-900 rounded-t-lg">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-400">Posted by: {user}</p>
        </div>
        <p className="text-xs text-gray-300">{date}</p>
      </div>

      {/* Event Content */}
      <div className="p-4">
        {image && (
          <img
            src={image}
            alt="Event"
            className="w-full h-auto rounded-lg mb-4 object-cover"
          />
        )}
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <p className="text-xs text-gray-500">Location: {location}</p>
        {deadline && (
          <p className="text-xs text-gray-400 mt-2">
            <span className="font-bold">Deadline:</span> {deadline}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 pb-4">
        {/* Comment Input */}
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full sm:w-2/3 p-2 text-sm bg-neutral-700 text-white rounded border border-neutral-600 mb-2 sm:mb-0 sm:mr-2 h-10"
        />

        {/* Register or Expired Button */}
        {isExpired ? (
          <button className="w-full sm:w-1/3 bg-red-600 text-white py-2 px-2 rounded-lg cursor-not-allowed h-10">
            Expired
          </button>
        ) : (
          <button
            className="w-full sm:w-1/3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded-lg h-10"
            onClick={onRegister}
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
}

function AddEventModal({ isOpen, onClose, onAddEvent }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    image: "",
    user: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.location ||
      !formData.user
    ) {
      alert("Please fill out all fields.");
      return;
    }
    onAddEvent(formData);
    setFormData({
      title: "",
      description: "",
      location: "",
      date: "",
      image: "",
      user: "",
      deadline: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-neutral-800 p-6 rounded-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 mb-4 text-sm bg-neutral-700 text-white rounded border border-neutral-600"
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mb-4 text-sm bg-neutral-700 text-white rounded border border-neutral-600 h-20"
          />
          <input
            type="text"
            name="user"
            placeholder="Posted By"
            value={formData.user}
            onChange={handleChange}
            className="w-full p-2 mb-4 text-sm bg-neutral-700 text-white rounded border border-neutral-600"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 mb-4 text-sm bg-neutral-700 text-white rounded border border-neutral-600"
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-2 mb-4 text-sm bg-neutral-700 text-white rounded border border-neutral-600"
          />
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 mb-4 text-sm bg-neutral-700 text-white rounded border border-neutral-600"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 mb-4 text-sm bg-neutral-700 text-white rounded border border-neutral-600"
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EventPage() {
  const [events, setEvents] = useState([
    {
      title: "Music Fest 2024",
      date: "2024-11-15",
      location: "Los Angeles, CA",
      description: "Enjoy live music, food, and fun!",
      image:
        "https://cdn.pixabay.com/photo/2023/02/23/10/16/ai-generated-7808455_960_720.jpg",
      user: "John Doe",
      deadline: "2024-11-10",
      isExpired: false,
    },
    {
      title: "Expired Event",
      date: "2024-10-15",
      location: "New York, NY",
      description: "This is an expired event example.",
      image: "",
      user: "Jane Doe",
      deadline: "2024-10-01",
      isExpired: true,
    },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, isExpired: false }]);
  };

  const handleRegister = (eventTitle) => {
    alert(`You have registered for: ${eventTitle}`);
  };

  return (
    <div className="text-white">
      {/* Story-Like Section */}
      <div className="flex overflow-x-scroll space-x-4 p-4 bg-neutral-900">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center w-24 h-24 bg-neutral-800 text-gray-400 rounded-full border border-gray-600"
        >
          + Add
        </button>
        {events.map((event, index) => (
          <div
            key={index}
            className="w-24 h-24 rounded-full border border-gray-600 overflow-hidden"
          >
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-700 text-center flex items-center justify-center text-sm">
                No Image
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddEvent={handleAddEvent}
      />

      {/* Event List */}
      <div className="w-full my-5 space-y-5">
        {events.map((event, index) => (
          <EventCard
            key={index}
            {...event}
            onRegister={() => handleRegister(event.title)}
          />
        ))}
      </div>
    </div>
  );
}

export default EventPage;
