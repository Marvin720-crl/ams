
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Search, Library as LibraryIcon, Send, CheckCircle, Clock } from 'lucide-react';
import { Book, BorrowRequest, LibraryBorrowing } from '@/utils/storage';
import { getBooksAction, getBorrowRequestsAction, addBorrowRequestAction, getLibraryBorrowingsAction } from '@/app/actions/dbActions';
import { toast } from 'sonner';

export default function Library() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [myRequests, setMyRequests] = useState<BorrowRequest[]>([]);
  const [myBorrowings, setMyBorrowings] = useState<LibraryBorrowing[]>([]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    const allBooks = await getBooksAction();
    const allRequests = await getBorrowRequestsAction();
    const allBorrowings = await getLibraryBorrowingsAction();

    setBooks(allBooks);
    setMyRequests(allRequests.filter(r => r.studentId === user.id));
    setMyBorrowings(allBorrowings.filter(b => b.studentId === user.id));
  };
  
  const handleRequestBorrow = async (book: Book) => {
    if (!user) return;

    // Check if there is an existing pending/approved request for this book
    const existingRequest = myRequests.find(r => r.bookId === book.id && (r.status === 'pending' || r.status === 'approved'));
    if (existingRequest) {
      toast.warning(`You already have a '${existingRequest.status}' request for this book.`);
      return;
    }

    if (!confirm(`Are you sure you want to request to borrow "${book.title}"?`)) return;

    try {
      await addBorrowRequestAction({
        bookId: book.id,
        bookBarcode: book.barcode,
        bookTitle: book.title,
        studentId: user.id,
        studentName: user.name,
        requestedAt: new Date().toISOString(),
        status: 'pending'
      });
      toast.success("Borrow request sent!");
      loadData();
    } catch(e) {
      toast.error("Failed to send borrow request.");
    }
  }

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };
  
  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl mb-2">Library</h2>
      <p className="text-gray-600 mb-8">Browse and borrow books from the library</p>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h3 className="text-xl mb-4 flex items-center gap-2">
          <LibraryIcon className="text-primary"/>
          Browse Books
        </h3>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {filteredBooks.map(book => (
                <div key={book.id} className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                        <p className="font-bold">{book.title}</p>
                        <p className="text-sm text-gray-500">{book.author}</p>
                        <p className={`text-sm font-semibold mt-1 ${book.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                          Status: <span className="capitalize">{book.status}</span>
                        </p>
                    </div>
                    <Button 
                      onClick={() => handleRequestBorrow(book)} 
                      disabled={book.status !== 'available'}
                      size="sm"
                      className="gap-2"
                    >
                        <Send size={16}/> Request
                    </Button>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl mb-6 flex items-center gap-2">
          <BookOpen size={24} className="text-[#b40000]" />
          My Borrowing Activity
        </h3>

        <h4 className="font-bold text-lg mb-4">Active Loans</h4>
        {myBorrowings.filter(b => b.status === 'borrowed').length === 0 ? (
          <p className="text-gray-500 text-center py-4 mb-4">No active loans.</p>
        ) : (
          <div className="space-y-3 mb-6">
            {myBorrowings.filter(b => b.status === 'borrowed').map(borrowing => (
              <div key={borrowing.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p>Book ID: {borrowing.bookId}</p>
                <p>Due Date: {new Date(borrowing.dueDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}

        <h4 className="font-bold text-lg mb-4">My Requests</h4>
        {myRequests.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No requests yet.</p>
        ) : (
          <div className="space-y-3">
            {myRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="mb-1 font-semibold">{request.bookTitle}</p>
                  <p className="text-sm text-gray-500">
                    Requested: {new Date(request.requestedAt).toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusBadge(request.status)}`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
