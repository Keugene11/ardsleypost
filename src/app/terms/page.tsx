import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-bg">
      <main className="max-w-md md:max-w-2xl mx-auto px-5 pt-8 pb-16">
        <h1 className="text-[24px] font-extrabold tracking-tight mb-6">
          Terms of Service
        </h1>
        <div className="text-[14px] leading-relaxed text-text-muted space-y-4">
          <p>
            <strong className="text-text">Last updated:</strong> April 2, 2026
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Ardsleypost, you agree to be bound by these
            Terms of Service. If you do not agree, please do not use the app.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            2. Description of Service
          </h2>
          <p>
            Ardsleypost is a community platform for Ardsley students, parents,
            and alumni. The app provides a social feed, direct messaging, and a
            services marketplace where users can offer and request services such
            as tutoring, driving, babysitting, and pet watching.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            3. User Accounts
          </h2>
          <p>
            You sign in using Google or Apple authentication. You are responsible
            for maintaining the security of your account and for all activity
            that occurs under it. You agree to provide accurate information and
            to keep your profile up to date. You may not share your account with
            others.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            4. User Conduct &amp; Zero Tolerance Policy
          </h2>
          <p>
            Ardsleypost has a <strong className="text-text">zero tolerance policy for objectionable content and abusive users</strong>.
            You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Harass, bully, or threaten other users</li>
            <li>
              Post hate speech, discriminatory content, or slurs of any kind
            </li>
            <li>
              Post, share, or transmit content that is offensive, sexually
              explicit, violent, or otherwise objectionable
            </li>
            <li>Spam, solicit, or send unsolicited promotions</li>
            <li>Impersonate another person or entity</li>
            <li>
              Post or share child sexual abuse or exploitation (CSAE) content
            </li>
            <li>
              Engage in or promote illegal activity
            </li>
            <li>
              Attempt to interfere with or disrupt the service
            </li>
          </ul>
          <p>
            Violation of these rules may result in content removal, temporary
            suspension, or permanent account termination without notice.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            5. Reporting &amp; Blocking
          </h2>
          <p>
            Users can report objectionable content or abusive behavior using the
            in-app report feature. All reports are reviewed and acted upon
            promptly. Users may also block other users to prevent unwanted
            contact and to hide their content from the feed.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            6. Content
          </h2>
          <p>
            You retain ownership of the content you post on Ardsleypost. By
            posting, you grant us a non-exclusive, royalty-free license to
            display, distribute, and store your content as needed to operate the
            service. We reserve the right to remove any content that violates
            these terms or is otherwise harmful to the community.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            7. Services Marketplace
          </h2>
          <p>
            Ardsleypost allows users to offer and book services including
            tutoring, babysitting, driving, and pet watching. Payments for these
            services are processed through Stripe. Ardsleypost facilitates the
            connection between service providers and buyers but is not a party to
            the transaction itself. Any disputes regarding the quality, delivery,
            or payment of services are between the users involved. We encourage
            users to communicate clearly and resolve issues directly.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            8. Privacy
          </h2>
          <p>
            Your use of Ardsleypost is also governed by our{" "}
            <Link
              href="/privacy"
              className="text-text underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            , which describes how we collect, use, and protect your information.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            9. Termination
          </h2>
          <p>
            We may suspend or terminate your account at any time if you violate
            these terms or engage in behavior that is harmful to the community.
            You may also delete your account at any time through the app.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            10. Disclaimers
          </h2>
          <p>
            Ardsleypost is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, either express or
            implied. We do not guarantee that the service will be uninterrupted,
            secure, or error-free.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            11. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, Ardsleypost and its
            operators shall not be liable for any indirect, incidental, special,
            or consequential damages arising from your use of the service,
            including but not limited to damages related to marketplace
            transactions between users.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            12. Changes to Terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of
            Ardsleypost after changes are posted constitutes your acceptance of
            the revised terms. We will update the date at the top of this page
            when changes are made.
          </p>

          <h2 className="text-[16px] font-semibold text-text pt-2">
            13. Contact
          </h2>
          <p>
            If you have questions about these terms, contact us at{" "}
            <a
              href="mailto:keugenelee11@gmail.com"
              className="text-text underline underline-offset-2"
            >
              keugenelee11@gmail.com
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
