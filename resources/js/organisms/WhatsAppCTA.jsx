import React from "react"
import { MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppCTA({ whatsappLink }) {
  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Butuh Bantuan?</h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Tim kami siap membantu Anda memilih materi yang tepat sesuai kebutuhan
          </p>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold gap-2 shadow-lg">
              Hubungi via WhatsApp
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
