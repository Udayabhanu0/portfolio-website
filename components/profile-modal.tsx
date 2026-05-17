'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProfileModalProps {
  imageUrl: string
  altText: string
  name: string
  className?: string
  imgClassName?: string
}

export function ProfileImage({
  imageUrl,
  altText,
  name,
  className,
  imgClassName,
}: ProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Profile Image - Clickable */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`relative cursor-pointer mx-auto mb-8 ${className ?? 'w-48 h-48 sm:w-56 sm:h-56'}`}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-colors duration-300 glow-cyan-lg">
          <img
            src={imageUrl}
            alt={altText}
            className={imgClassName ?? 'w-full h-full object-cover'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <span className="text-cyan-300 text-sm font-medium">Click to enlarge</span>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="relative max-w-2xl w-full">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-12 right-0 text-gray-400 hover:text-cyan-400 transition-colors z-10"
                  aria-label="Close modal"
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Image Container */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-auto rounded-2xl border border-cyan-400/30"
                  />
                </motion.div>

                {/* Image Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-center"
                >
                  <p className="text-gray-300 text-sm">
                    Press <span className="text-cyan-400 font-semibold">ESC</span> or click outside to close
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
