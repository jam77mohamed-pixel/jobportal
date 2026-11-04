import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Modal } from '../common/Modal';

export const DeleteConfirmModal = ({ isOpen, onClose, company, onConfirm }) => {
  if (!company) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Company"
      subtitle="This action cannot be undone."
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-2xl flex items-start gap-3">
          <div className="p-2 rounded-xl bg-rose-900/60 text-rose-300 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-rose-200">
              Are you sure you want to remove &quot;{company.name}&quot;?
            </h4>
            <p className="text-xs text-rose-300/80 mt-1 leading-relaxed">
              All linked job postings, candidate submissions, and company profile records
              will be permanently removed from your active workspace.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(company.id)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
