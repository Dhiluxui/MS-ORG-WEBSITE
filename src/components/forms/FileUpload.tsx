"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface FileUploadProps {
  bucket: string;
  folder?: string;
  onUploadSuccess: (url: string) => void;
  label?: string;
  accept?: string;
  maxSizeMB?: number;
}

export function FileUpload({ 
  bucket, 
  folder = 'uploads', 
  onUploadSuccess, 
  label = "Upload Image", 
  accept = "image/*",
  maxSizeMB = 5 
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File must be less than ${maxSizeMB}MB`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setUploadedUrl(publicUrl);
      onUploadSuccess(publicUrl);
      
    } catch (err: any) {
      setError(err.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setUploadedUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onUploadSuccess('');
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-bold tracking-wider uppercase text-white/70 mb-2 font-rajdhani">
        {label}
      </label>
      
      {!uploadedUrl ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all
            ${isUploading ? 'border-ms-blue/50 bg-ms-blue/5' : 'border-white/10 hover:border-ms-blue/50 hover:bg-white/5'}
            ${error ? 'border-st-red/50 bg-st-red/5' : ''}
          `}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept={accept} 
            className="hidden" 
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="animate-spin text-ms-blue mb-3" size={32} />
              <p className="text-sm font-medium text-white/70 font-inter">Uploading to secure server...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud className="text-white/30 mb-3" size={32} />
              <p className="text-sm font-medium text-white/70 font-inter text-center mb-1">
                Click or drag file to upload
              </p>
              <p className="text-xs text-white/40 font-inter">
                Max size {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative border border-st-green/30 bg-st-green/5 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="w-12 h-12 bg-black/50 rounded-lg flex items-center justify-center shrink-0 border border-white/10 overflow-hidden">
              {uploadedUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <img src={uploadedUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-white/50" size={20} />
              )}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 size={14} className="text-st-green" /> Upload Successful
              </span>
              <span className="text-xs text-white/50 truncate font-mono mt-1">
                {uploadedUrl}
              </span>
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); resetUpload(); }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-4 shrink-0 text-white/50 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-st-red font-medium flex items-center gap-2">
          <X size={14} /> {error}
        </p>
      )}
    </div>
  );
}
