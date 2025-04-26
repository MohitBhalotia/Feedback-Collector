import React from 'react';
import { toast } from 'react-hot-toast';

const FeedbackForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = React.useState({ name: '', email: '', message: '', category: 'general' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  // Categories for feedback
  const categories = [
    { id: 'general', label: 'General Feedback' },
    { id: 'bug', label: 'Bug Report' },
    { id: 'feature', label: 'Feature Request' },
    { id: 'praise', label: 'Praise' }
  ];

  // Basic validation
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Enter a valid email.";
    }
    if (!form.message.trim()) errs.message = "Feedback message is required.";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      // Ensure category is included in the submission
      const formData = {
        name: form.name,
        email: form.email,
        message: form.message,
        category: form.category || 'general'
      };
      console.log(formData);
      
      
      const res = await fetch("http://localhost:5000/api/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      
      toast.success("Thank you for your feedback!");
      setForm({ name: '', email: '', message: '', category: 'general' });
      if (onSubmitSuccess) onSubmitSuccess(true); // Pass a flag indicating success, but do not show a toast in parent

    } catch (err) {
      toast.error("Could not submit feedback. Please try again.");
      setErrors({ submit: "Could not submit feedback. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700" aria-label="Feedback Form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-white" htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 outline-none focus:ring transition ${errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            disabled={loading}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1" id="name-error">{errors.name}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-white" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 outline-none focus:ring transition ${errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            disabled={loading}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1" id="email-error">{errors.email}</p>}
        </div>
      </div>
      
      <div>
        <label className="block font-medium mb-1 text-gray-900 dark:text-white" htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 outline-none focus:ring transition border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          disabled={loading}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.label}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block font-medium mb-1 text-gray-900 dark:text-white" htmlFor="message">Feedback</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 outline-none focus:ring transition ${errors.message ? "border-red-500" : "border-gray-200 dark:border-gray-600"} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          disabled={loading}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
        />
        {errors.message && <p className="text-red-500 text-sm mt-1" id="message-error">{errors.message}</p>}
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400 transition disabled:opacity-50"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" /></svg>
            Submitting...
          </span>
        ) : "Submit Feedback"}
      </button>
      {errors.submit && <p className="text-red-500 text-sm mt-2">{errors.submit}</p>}
    </form>
  );
};

export default FeedbackForm;
