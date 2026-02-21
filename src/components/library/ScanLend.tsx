
'use client';

import React, { useState } from 'react';
import { Scan, User, Book, CheckCircle, RotateCcw, QrCode } from 'lucide-react';
import { Book as BookType, User as UserType } from '@/utils/storage';
import { getBooksAction, getUsersAction, updateBookAction, addLibraryBorrowingAction, updateLibraryBorrowingAction } from '@/app/actions/dbActions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BarcodeScanner from './BarcodeScanner';


export default function ScanLend() {
  const [bookBarcode, setBookBarcode] = useState('');
  const [bookInfo, setBookInfo] = useState<BookType | null>(null);
  const [userUSN, setUserUSN] = useState('');
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [daysUntilDue, setDaysUntilDue] = useState('7');
  const [step, setStep] = useState<'scan' | 'user' | 'confirm'>('scan');
  const [mode, setMode] = useState<'lend' | 'return'>('lend');
  const [showScanner, setShowScanner] = useState(false);

  const handleScanResult = (result: string) => {
    setShowScanner(false);
    if (step === 'scan') {
      setBookBarcode(result);
      scanBook(result);
    } else if (step === 'user') {
      setUserUSN(result);
      findUser(result);
    }
  }

  const scanBook = async (barcode: string) => {
    if (!barcode.trim()) {
      toast.error('Please enter a book barcode');
      return;
    }

    try {
      const books = await getBooksAction();
      const book = books.find((b: any) => b.barcode === barcode);

      if (!book) {
        toast.error('Book not found!');
        return;
      }

      if (mode === 'lend' && book.status === 'borrowed') {
        toast.warning('This book is currently borrowed!', { description: `Borrowed by ${book.borrowerId}` });
        return;
      }

      if (mode === 'return' && book.status !== 'borrowed') {
        toast.warning('This book is not currently borrowed!');
        return;
      }

      setBookInfo(book);
      toast.success("Book found: " + book.title);
      
      if (mode === 'return') {
        const users = await getUsersAction();
        const borrowerInfo = users.find(u => u.id === book.borrowerId);
        if (borrowerInfo) {
          setUserInfo(borrowerInfo);
          setStep('confirm');
        } else {
          setStep('user');
        }
      } else {
        setStep('user');
      }
    } catch (e) {
      toast.error("Error finding book.");
    }
  };

  const findUser = async (usn: string) => {
    if (!usn.trim()) {
      toast.error('Please enter a USN/EMP ID');
      return;
    }
    
    try {
        const users = await getUsersAction();
        const user = users.find((u: any) => u.id === usn);

        if (!user) {
        toast.error('User not found!');
        return;
        }

        setUserInfo(user);
        setStep('confirm');
        toast.success("User found: " + user.name);
    } catch(e) {
        toast.error("Error finding user.");
    }
  };
  
  const confirmLending = async () => {
    if (!bookInfo || !userInfo) return;

    try {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + parseInt(daysUntilDue || '7'));

        await updateBookAction(bookInfo.id, {
            status: 'borrowed',
            borrowerId: userInfo.id,
            borrowedAt: new Date().toISOString(),
            dueDate: dueDate.toISOString(),
        });
        
        await addLibraryBorrowingAction({
            bookId: bookInfo.id,
            studentId: userInfo.id,
            borrowDate: new Date().toISOString(),
            dueDate: dueDate.toISOString(),
            status: 'borrowed'
        });

        toast.success(`Book lent to ${userInfo.name}!`, { description: `Due on ${dueDate.toLocaleDateString()}`});
        reset();
    } catch(e) {
        toast.error("Failed to lend book.");
    }
  };

  const handleReturn = async () => {
    if (!bookInfo) return;

    try {
      await updateBookAction(bookInfo.id, {
        status: 'available',
        borrowerId: undefined,
        borrowedAt: undefined,
        dueDate: undefined,
      });

      const borrowings = await getLibraryBorrowingsAction();
      const record = borrowings.slice().reverse().find(
        (r) => r.bookId === bookInfo.id && !r.returnDate
      );
      
      if (record) {
        await updateLibraryBorrowingAction(record.id, {
            returnDate: new Date().toISOString(),
            status: 'returned'
        });
      }
      
      toast.success(`Book "${bookInfo.title}" returned successfully!`);
      reset();
    } catch(e) {
      toast.error("Failed to return book.");
    }
  };

  const reset = () => {
    setBookBarcode('');
    setBookInfo(null);
    setUserUSN('');
    setUserInfo(null);
    setDaysUntilDue('7');
    setStep('scan');
    setShowScanner(false);
  };
  
  const getStepClass = (currentStep: string, thisStep: string) => {
    if (currentStep === thisStep) return 'bg-primary text-white';
    
    // a bit of logic to check if a step is completed
    if (thisStep === 'scan' && bookInfo) return 'bg-green-500 text-white';
    if (thisStep === 'user' && userInfo) return 'bg-green-500 text-white';

    return 'bg-gray-300 text-gray-600';
  }


  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl mb-2">Scan & Lend Books</h2>
          <p className="text-gray-600">Scan book barcode and student ID to lend or return books</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => { setMode('lend'); reset(); }} variant={mode === 'lend' ? 'default' : 'secondary'} className="gap-2">
            Lend Book
          </Button>
          <Button onClick={() => { setMode('return'); reset(); }} variant={mode === 'return' ? 'default' : 'secondary'} className="gap-2">
            Return Book
          </Button>
        </div>
      </div>

      {showScanner && <BarcodeScanner onScan={handleScanResult} onCancel={() => setShowScanner(false)} />}

      {!showScanner && <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl">
        {/* Step 1: Scan Book */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getStepClass(step, 'scan')}`}>1</div>
            <h3 className="text-xl">Scan Book</h3>
          </div>

          <div className="ml-11 space-y-4">
            {!bookInfo ? (
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={bookBarcode}
                  onChange={(e) => setBookBarcode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && scanBook(e.currentTarget.value)}
                  placeholder="Scan or enter barcode..."
                  disabled={step !== 'scan'}
                  className="flex-grow"
                />
                <Button onClick={() => setShowScanner(true)} disabled={step !== 'scan'}><Scan size={20} /></Button>
              </div>
            ) : (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2"><CheckCircle size={20} className="text-green-600" /><span className="text-green-900 font-semibold">Book Found</span></div>
                <p><strong>{bookInfo.title}</strong> ({bookInfo.barcode})</p>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Find User */}
        {mode === 'lend' && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getStepClass(step, 'user')}`}>2</div>
              <h3 className="text-xl">Find Student/Teacher</h3>
            </div>

            <div className="ml-11 space-y-4">
              {!userInfo ? (
                <div className="flex gap-2">
                  <Input type="text" value={userUSN} onChange={(e) => setUserUSN(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && findUser(e.currentTarget.value)} placeholder="Scan or enter USN/EMP ID..." disabled={step !== 'user'}/>
                  <Button onClick={() => setShowScanner(true)} disabled={step !== 'user'}><QrCode size={20} /></Button>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2"><CheckCircle size={20} className="text-green-600" /><span className="text-green-900 font-semibold">User Found</span></div>
                  <p><strong>{userInfo.name}</strong> ({userInfo.id})</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 'confirm' && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getStepClass(step, 'confirm')}`}>{mode === 'lend' ? '3' : '2'}</div>
              <h3 className="text-xl">{mode === 'lend' ? 'Confirm & Set Due Date' : 'Confirm Return'}</h3>
            </div>

            <div className="ml-11 space-y-4">
              {mode === 'lend' ? (
                <div className="space-y-4">
                  <div>
                    <Label>Days Until Due</Label>
                    <Input type="number" value={daysUntilDue} onChange={(e) => setDaysUntilDue(e.target.value)} min="1" />
                    <p className="text-sm text-gray-600 mt-2">Due Date: {new Date(Date.now() + parseInt(daysUntilDue || '7') * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={confirmLending} className="flex-1 gap-2 bg-green-600 hover:bg-green-700"><CheckCircle size={20} />Confirm & Lend</Button>
                    <Button onClick={reset} variant="secondary">Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                        <p>Book: <strong>{bookInfo?.title}</strong></p>
                        <p>Borrowed by: <strong>{userInfo?.name} ({userInfo?.id})</strong></p>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={handleReturn} className="flex-1 gap-2 bg-green-600 hover:bg-green-700"><CheckCircle size={20} />Confirm Return</Button>
                        <Button onClick={reset} variant="secondary">Cancel</Button>
                    </div>
                </div>
              )}
            </div>
          </div>
        )}

        {(bookInfo || userInfo) && (
          <Button onClick={reset} variant="ghost" className="w-full mt-4 gap-2 text-muted-foreground"><RotateCcw size={16}/>Start Over</Button>
        )}
      </div>}
    </div>
  );
}
