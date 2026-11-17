'use client'

import { useEffect } from 'react'

type GtagFn = (command: 'event', name: string, params?: Record<string, unknown>) => void

function send(name: string, params: Record<string, unknown> = {}) {
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag
  if (typeof gtag === 'function') gtag('event', name, params)
}

const clean = (value: string | null | undefined, max = 100) =>
  (value ?? '').replace(/\s+/g, ' ').trim().slice(0, max)

function sectionOf(el: Element | null): string {
  return el?.closest('section[id]')?.id || el?.closest('header')?.tagName.toLowerCase() || 'page'
}

/**
 * Sends GA4 events for every click, scroll-depth milestone and section view.
 * Page views are handled by the base gtag config.
 */
export function AnalyticsTracker() {
  useEffect(() => {
    // ---- Clicks (delegated, capture phase so stopPropagation can't hide them) ----
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      if (!target || !target.closest) return

      const interactive = target.closest('a, button, [role="button"], [role="tab"], input[type="submit"]')
      const el = interactive ?? target
      const label =
        clean(el.getAttribute('aria-label')) ||
        clean(el.getAttribute('data-track')) ||
        clean(el.textContent) ||
        clean(el.getAttribute('title')) ||
        el.tagName.toLowerCase()

      const base = {
        click_text: label,
        click_tag: el.tagName.toLowerCase(),
        section: sectionOf(el),
        page_path: window.location.pathname,
      }

      const anchor = target.closest('a')
      if (anchor && anchor.href) {
        let url: URL | null = null
        try {
          url = new URL(anchor.href, window.location.href)
        } catch {
          /* ignore malformed href */
        }

        if (url) {
          const href = anchor.getAttribute('href') || ''
          if (url.protocol === 'mailto:' || url.protocol === 'tel:') {
            send('contact_click', { ...base, contact_type: url.protocol.replace(':', ''), link_url: href })
          } else if (/\.(pdf|docx?|zip)$/i.test(url.pathname)) {
            send('file_download', { ...base, file_name: url.pathname.split('/').pop(), link_url: url.href })
          } else if (url.origin !== window.location.origin) {
            send('outbound_click', { ...base, link_url: url.href, link_domain: url.hostname })
          } else if (url.hash) {
            send('nav_click', { ...base, link_url: url.hash })
          } else {
            send('link_click', { ...base, link_url: url.pathname })
          }
          return
        }
      }

      send(interactive ? 'button_click' : 'page_click', base)
    }
    document.addEventListener('click', onClick, true)

    // ---- Scroll depth: 10% milestones ----
    const seen = new Set<number>()
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const doc = document.documentElement
        const scrollable = doc.scrollHeight - window.innerHeight
        if (scrollable <= 0) return
        const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100))
        for (let m = 10; m <= 100; m += 10) {
          if (pct >= m && !seen.has(m)) {
            seen.add(m)
            send('scroll_depth', { percent_scrolled: m, page_path: window.location.pathname })
          }
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // ---- Section views ----
    const viewed = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewed.has(entry.target.id)) {
            viewed.add(entry.target.id)
            send('section_view', { section: entry.target.id, page_path: window.location.pathname })
          }
        }
      },
      { threshold: 0.4 },
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))

    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return null
}
