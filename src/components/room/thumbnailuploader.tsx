'use client';

import { useState } from 'react';
import { upload } from '@vercel/blob/client';
import { FaImage } from 'react-icons/fa';

interface ThumbnailUploaderProps {
  onImageUploaded: (url: string) => void;
}

export default function ThumbnailUploader({ onImageUploaded }: ThumbnailUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      // Start upload process
      try {
        setIsUploading(true);
        
        // Upload to Vercel Blob
        const blob = await upload(selectedFile.name, selectedFile, {
          access: 'public',
          handleUploadUrl: '/api/thumbnail-upload',
          onUploadProgress: (progressEvent) => {
            setProgress(progressEvent.percentage);
          },
        });
        
        // Pass the URL back to parent component
        onImageUploaded(blob.url);
      } catch (error) {
        console.error('Upload failed:', error);
        alert(`Error uploading image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="w-full">
      <label className="block text-gray-300 mb-2">Cover Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="thumbnail-upload"
        disabled={isUploading}
      />
      <label
        htmlFor="thumbnail-upload"
        className="block aspect-video w-full bg-gray-900/50 border border-white/10 rounded-lg overflow-hidden cursor-pointer relative"
      >
        {preview ? (
          <div className="h-full w-full relative">
            <img src={preview} alt="Cover preview" className="h-full w-full object-cover" />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <FaImage className="text-3xl mb-2" />
            <span>{isUploading ? `Uploading... ${progress}%` : 'Upload cover image'}</span>
          </div>
        )}
      </label>
    </div>
  );
}