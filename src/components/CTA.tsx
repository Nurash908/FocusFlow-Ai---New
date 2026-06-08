import { motion } from "motion/react";

export default function CTA() {
  return (
    <section className="py-24 text-center">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-6 py-16 rounded-3xl bg-gradient-to-tr from-blue-900/20 to-purple-900/20 border border-white/10"
        >
            <h2 className="font-display text-5xl font-bold text-white mb-6">
                Ready to Take Back Your Focus?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
                Join the next generation of students building healthier digital habits.
            </p>
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-lg hover:opacity-90 transition-opacity">
                Start Your Journey
            </button>
        </motion.div>
    </section>
  );
}
