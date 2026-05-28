export default function ContactSupport() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Support</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-on-surface-variant">
            Have questions or need assistance? Our team is here to help you get
            the most out of TideWatch.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-primary">support@tidewatch.com</p>
            </div>
            {/* <div>
              <h3 className="font-semibold">Help Center</h3>
              <p className="text-on-surface-variant">Visit our documentation for quick answers.</p>
            </div> */}
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-outline-variant rounded-lg bg-surface"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-outline-variant rounded-lg bg-surface"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full px-4 py-2 border border-outline-variant rounded-lg bg-surface min-h-[150px]"
              placeholder="How can we help?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
