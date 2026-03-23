import AutoScroll from "embla-carousel-auto-scroll"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { CSSProperties } from "react"

interface Logo {
  id: string
  description: string
  image: string
  className?: string
  style?: CSSProperties
}

interface LogosCarouselProps {
  heading?: string
  logos?: Logo[]
}

const defaultLogos: Logo[] = [
  { id: "logo-1", description: "Collaborator 1", image: "/collab1.png", className: "h-10 w-auto" },
  { id: "logo-2", description: "Collaborator 2", image: "/collab2.png", className: "h-10 w-auto" },
  { id: "logo-3", description: "Carbono Solutions", image: "/carbono-solutions-logo.png", className: "h-10 w-auto" },
  { id: "logo-4", description: "Inertia Advisory", image: "/inertia.png", className: "h-10 w-auto", style: { mixBlendMode: 'screen' } },
]

export function LogosCarousel({ heading = "Our Collaborators", logos = defaultLogos }: LogosCarouselProps) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="section-tag section-tag-no-line justify-center mb-4" style={{ color: '#67e8f9' }}>
            {heading}
          </div>
        </div>
        <div className="relative">
          <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}>
            <CarouselContent className="ml-0 justify-center">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/4"
                >
                  <div className="mx-2 flex shrink-0 items-center justify-center">
                    <img src={logo.image} alt={logo.description} className={logo.className} style={logo.style} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-16 pointer-events-none" style={{ background: 'linear-gradient(to right, rgb(18,10,60), transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-16 pointer-events-none" style={{ background: 'linear-gradient(to left, rgb(18,10,60), transparent)' }} />
        </div>
      </div>
    </section>
  )
}
