import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CSVLink } from 'react-csv';
import FeedbackList from './FeedbackList';
import DashboardStats from './DashboardStats';

const ITEMS_PER_PAGE = 5;

const AdminDashboard = ({ adminPassword }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [deletingId, setDeletingId] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const API_URL = import.meta.env.VITE_API_URL;
  
  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'general', label: 'General Feedback' },
    { id: 'bug', label: 'Bug Report' },
    { id: 'feature', label: 'Feature Request' },
    { id: 'praise', label: 'Praise' }
  ];

  // CSV headers for export
  const csvHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Category', key: 'category' },
    { label: 'Message', key: 'message' },
    { label: 'Date', key: 'createdAt' }
  ];

  // Fetch feedbacks on mount and when admin password changes
  useEffect(() => {
    if (adminPassword) {
      // Silent fetch on initial load (no toast)
      fetchFeedbacks(true);
    }
  }, [adminPassword]);

  // Filter and sort feedbacks when search, sort, or category filter changes
  useEffect(() => {
    let result = [...feedbacks];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(fb => {
        // Handle case where category might be undefined
        const fbCategory = fb.category || 'general';
        return fbCategory === categoryFilter;
      });
    }
    
    // Apply search filter
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(fb => 
        fb.name.toLowerCase().includes(lowerSearch) ||
        fb.email.toLowerCase().includes(lowerSearch) ||
        fb.message.toLowerCase().includes(lowerSearch)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];
      
      // Handle dates
      if (sortField === 'createdAt' || sortField === 'updatedAt') {
        fieldA = new Date(fieldA);
        fieldB = new Date(fieldB);
      }
      
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredFeedbacks(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [feedbacks, search, sortField, sortDirection, categoryFilter]);

  // Fetch all feedbacks
  const fetchFeedbacks = async (silent = false) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/feedbacks`, {
        headers: {
          Authorization: `Bearer ${adminPassword}`,
        },
      });
      
      if (res.status === 401) {
        setError("Unauthorized: Incorrect admin password.");
        setFeedbacks([]);
        if (!silent) {
          toast.error("Authentication failed. Please check your admin password.");
        }
        return;
      }
      
      if (!res.ok) throw new Error("Failed to fetch feedbacks");
      
      const data = await res.json();
      setFeedbacks(data);
      
      // Only show success toast if not silent and explicitly refreshed
      if (!silent) {
        toast.success("Feedbacks loaded successfully");
      }
    } catch (err) {
      setError("Could not fetch feedbacks.");
      if (!silent) {
        toast.error("Failed to load feedbacks");
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete a feedback
  const handleDeleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }
    
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/api/feedbacks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminPassword}`,
        },
      });
      
      if (!res.ok) throw new Error("Deletion failed");
      
      setFeedbacks(feedbacks.filter(fb => fb._id !== id));
      toast.success("Feedback deleted successfully");
    } catch (err) {
      setError("Could not delete feedback.");
      toast.error("Failed to delete feedback");
    } finally {
      setDeletingId('');
    }
  };

  // Toggle sort direction or change sort field
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFeedbacks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredFeedbacks.length / ITEMS_PER_PAGE);

  // Pagination controls
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 space-y-6" aria-label="Admin Dashboard">
      {/* Dashboard Stats */}
      <DashboardStats feedbacks={feedbacks} />
      
      {/* Search and Filters */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-sm text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Search by name, email, or message..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search feedbacks"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            aria-label="Filter by category"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          
          <select
            value={sortField}
            onChange={e => handleSort(e.target.value)}
            className="border rounded px-3 py-2 text-sm text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            aria-label="Sort by field"
          >
            <option value="createdAt">Date</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
          </select>
          
          <button
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            className="border rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            aria-label={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
          >
            {sortDirection === 'asc' ? '↑' : '↓'}
          </button>
          
          <CSVLink
            data={filteredFeedbacks}
            headers={csvHeaders}
            filename={`feedback-export-${new Date().toISOString().slice(0, 10)}.csv`}
            className="ml-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-900 text-sm hover:bg-green-700 dark:hover:bg-green-800 transition"
          >
            Export CSV
          </CSVLink>
          
          <button
            onClick={fetchFeedbacks}
            className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-900 text-sm hover:bg-blue-700 dark:hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            Showing {filteredFeedbacks.length} of {feedbacks.length} feedbacks
          </span>
          
          {feedbacks.length > 0 && (
            <span className="text-gray-500">
              Latest: {new Date(feedbacks[0]?.createdAt).toLocaleString()}
            </span>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {/* Feedback List */}
      <FeedbackList
        feedbacks={getCurrentPageItems()}
        loading={loading}
        onDelete={handleDeleteFeedback}
        onView={setSelectedFeedback}
        deletingId={deletingId}
        selectedFeedback={selectedFeedback}
        onCloseModal={() => setSelectedFeedback(null)}
      />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
            aria-label="First page"
          >
            &laquo;
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
          
          <span className="px-3 py-1 text-gray-900 dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
            aria-label="Next page"
          >
            &rsaquo;
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
            aria-label="Last page"
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
