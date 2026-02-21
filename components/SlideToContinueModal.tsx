"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SlideToContinueModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  subtitle?: string
}

const SLIDER_THRESHOLD = 0.85

export function SlideToContinueModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Ready to Play?",
  subtitle = "Slide to confirm and start the contest",
}: SlideToContinueModalProps) {
  const [sliderPosition, setSliderPosition] = useState(0)
  const [trackWidth, setTrackWidth] = useState(280)
  const confirmedRef = useRef(false)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setSliderPosition(0)
      confirmedRef.current = false
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !trackRef.current) return
    const el = trackRef.current
    const onResize = () => setTrackWidth(el.offsetWidth)
    onResize()
    const ro = new ResizeObserver(onResize)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isOpen])

  const maxDrag = trackWidth * SLIDER_THRESHOLD

  const handleDrag = (_: any, info: any) => {
    const value = Math.max(0, Math.min(info.point.x - info.offset.x, trackWidth))
    setSliderPosition(info.point.x)
  }

  const handleDragEnd = () => {
    if (sliderPosition >= maxDrag && !confirmedRef.current) {
      confirmedRef.current = true
      onConfirm()
      setSliderPosition(0)
    } else {
      setSliderPosition(0)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-[20px] border-[4px] border-black p-6 w-full max-w-[340px] shadow-[8px_8px_0px_#000]"
          >
            <h3 className="text-[20px] font-[900] uppercase tracking-tight mb-1 text-center">
              {title}
            </h3>

            <p className="text-[13px] font-[700] text-black/70 text-center mb-6 uppercase">
              {subtitle}
            </p>

            {/* Slider Track */}
            <div
              ref={trackRef}
              className="relative w-full h-[56px] bg-gray-100 rounded-[14px] border-[3px] border-black overflow-hidden select-none shadow-[4px_4px_0px_#000]"
            >
              {/* Progress Fill */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#A5F3A0]"
                animate={{
                  width: `${Math.min(
                    (sliderPosition / trackWidth) * 100,
                    100
                  )}%`,
                }}
                transition={{ type: "tween", duration: 0.15 }}
              />

              {/* Draggable Knob */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: trackWidth - 52 }}
                dragElastic={0}
                onDrag={(e, info) => {
                  setSliderPosition(info.offset.x)
                }}
                onDragEnd={handleDragEnd}
                className="absolute top-1 left-1 w-[44px] h-[44px] bg-[#FFDB58] rounded-[10px] border-[3px] border-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[3px_3px_0px_#000]"
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6 stroke-[3px]" />
              </motion.div>

              <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[12px] font-[800] uppercase tracking-wide text-black/80">
                Slide to continue
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full mt-4 py-2 text-[12px] font-[800] uppercase text-black/60 hover:text-black"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}