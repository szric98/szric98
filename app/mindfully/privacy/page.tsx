import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mindfully — Privacy Policy",
  description:
    "Privacy policy for the Mindfully Chrome extension. We do not collect, sell, or share your data.",
};

export default function MindfullyPrivacyPage() {
  return (
    <main className="mx-auto max-w-[42rem] px-5 py-10 pb-16 font-sans text-base leading-normal text-[#20242a]">
      <h1 className="mb-2 text-[1.75rem] font-bold tracking-[-0.02em]">
        Mindfully — Privacy Policy
      </h1>
      <p className="mb-8 text-sm text-[#7a8288]">
        <strong>Last updated:</strong> July 30, 2026
      </p>

      <section
        className="mb-4 rounded-xl border border-[#e7eaec] bg-[#f5f7f8] px-5 py-4"
        aria-labelledby="summary-heading"
      >
        <h2 id="summary-heading" className="mb-3 text-lg font-semibold">
          Summary
        </h2>
        <p className="mb-0">
          Mindfully is a Chrome extension that helps you pause before visiting
          distracting websites.{" "}
          <strong>
            We do not operate servers, we never receive or store your data on
            our systems, and we do not collect, sell, or share your data with
            third parties.
          </strong>{" "}
          All data stays in your browser via Chrome’s built-in storage APIs.
          Because we do not hold your data, there is nothing for us to access or
          delete on your behalf—you control it entirely on your device.
        </p>
      </section>

      <section aria-labelledby="collect-heading">
        <h2 id="collect-heading" className="mt-8 mb-3 text-lg font-semibold">
          What we collect
        </h2>
        <p className="mb-4">
          Mindfully stores the following <strong>only on your device</strong>{" "}
          (and, for settings, in Chrome Sync if you have it enabled):
        </p>
        <table className="mb-4 w-full border-collapse text-sm">
          <thead>
            <tr>
              <th
                scope="col"
                className="border border-[#e7eaec] bg-[#f5f7f8] px-3 py-2.5 text-left align-top font-semibold"
              >
                Data
              </th>
              <th
                scope="col"
                className="border border-[#e7eaec] bg-[#f5f7f8] px-3 py-2.5 text-left align-top font-semibold"
              >
                Purpose
              </th>
              <th
                scope="col"
                className="border border-[#e7eaec] bg-[#f5f7f8] px-3 py-2.5 text-left align-top font-semibold"
              >
                Where stored
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Blocked site patterns (URLs/domains you add)
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Know which sites to gate
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                <code className="rounded bg-[#f5f7f8] px-1.5 py-0.5 text-[0.85em]">
                  chrome.storage.sync
                </code>
              </td>
            </tr>
            <tr>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Session timer presets
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Gate duration options
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                <code className="rounded bg-[#f5f7f8] px-1.5 py-0.5 text-[0.85em]">
                  chrome.storage.sync
                </code>
              </td>
            </tr>
            <tr>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Day-of-week schedule settings
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                When blocking is active
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                <code className="rounded bg-[#f5f7f8] px-1.5 py-0.5 text-[0.85em]">
                  chrome.storage.sync
                </code>
              </td>
            </tr>
            <tr>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Active gate sessions (intention text, timer, expiry)
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Run the gate and session timer
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                <code className="rounded bg-[#f5f7f8] px-1.5 py-0.5 text-[0.85em]">
                  chrome.storage.session
                </code>{" "}
                (cleared when the browser session ends)
              </td>
            </tr>
            <tr>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Intention log (your written intention, domain, URL, duration,
                timestamp)
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Local history of gate completions
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                <code className="rounded bg-[#f5f7f8] px-1.5 py-0.5 text-[0.85em]">
                  chrome.storage.local
                </code>
              </td>
            </tr>
            <tr>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Overlay position
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                Remember timer overlay placement
              </td>
              <td className="border border-[#e7eaec] px-3 py-2.5 align-top">
                <code className="rounded bg-[#f5f7f8] px-1.5 py-0.5 text-[0.85em]">
                  chrome.storage.local
                </code>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mb-4">
          When you visit a URL that matches a blocked pattern, the extension
          reads that URL <strong>only</strong> to decide whether to show the
          gate. We do not track your full browsing history across the web.
        </p>
      </section>

      <section aria-labelledby="not-collect-heading">
        <h2
          id="not-collect-heading"
          className="mt-8 mb-3 text-lg font-semibold"
        >
          What we do not collect
        </h2>
        <ul className="mb-4 list-disc space-y-1.5 pl-5">
          <li>No accounts or login</li>
          <li>No analytics or telemetry</li>
          <li>No ads</li>
          <li>No data sent to the developer or any third party</li>
          <li>No sale of data</li>
        </ul>
      </section>

      <section aria-labelledby="use-heading">
        <h2 id="use-heading" className="mt-8 mb-3 text-lg font-semibold">
          How we use data
        </h2>
        <p className="mb-4">
          Data is used <strong>only</strong> to provide Mindfully’s features:
          blocking configured sites, showing the intention gate, running session
          timers, and saving your settings.
        </p>
      </section>

      <section aria-labelledby="sync-heading">
        <h2 id="sync-heading" className="mt-8 mb-3 text-lg font-semibold">
          Chrome Sync
        </h2>
        <p className="mb-4">
          Settings (blocked sites, presets, schedule) are saved with{" "}
          <code className="rounded bg-[#f5f7f8] px-1.5 py-0.5 text-[0.85em]">
            chrome.storage.sync
          </code>
          . If Chrome Sync is enabled on your profile, Google may sync that data
          across your signed-in devices per{" "}
          <a
            href="https://policies.google.com/privacy"
            className="text-[#17968c] hover:text-[#2ec4b6]"
          >
            Google’s Chrome Sync policies
          </a>
          . The intention log and overlay position use local storage only and
          are not synced by Mindfully.
        </p>
      </section>

      <section aria-labelledby="permissions-heading">
        <h2
          id="permissions-heading"
          className="mt-8 mb-3 text-lg font-semibold"
        >
          Permissions
        </h2>
        <p className="mb-4">
          Mindfully requests Chrome permissions only to function:
        </p>
        <ul className="mb-4 list-disc space-y-1.5 pl-5">
          <li>
            <strong>storage</strong> — save settings and session data
          </li>
          <li>
            <strong>tabs</strong> — redirect blocked tabs and manage the gate
            flow
          </li>
          <li>
            <strong>webNavigation</strong> — intercept navigation to blocked
            URLs
          </li>
          <li>
            <strong>alarms</strong> — end sessions when timers expire
          </li>
          <li>
            <strong>scripting</strong> — show the timer overlay on blocked sites
          </li>
          <li>
            <strong>
              host access (<code>&lt;all_urls&gt;</code>)
            </strong>{" "}
            — act only on URLs you have configured as blocked; we do not
            blanket-monitor unrelated sites
          </li>
        </ul>
      </section>

      <section aria-labelledby="delete-heading">
        <h2 id="delete-heading" className="mt-8 mb-3 text-lg font-semibold">
          How to delete your data
        </h2>
        <p className="mb-4">
          You can remove your data yourself at any time. No account or contact
          with the developer is required.
        </p>
        <ul className="mb-4 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Remove all Mindfully data:</strong> Chrome → Extensions →
            Mindfully → “Remove” (uninstall), or clear the extension’s site data
            / storage in extension details.
          </li>
          <li>
            <strong>Clear synced settings only:</strong> remove or edit entries
            in Mindfully Settings, or clear extension data for Mindfully in{" "}
            <code className="rounded bg-[#f5f7f8] px-1.5 py-0.5 text-[0.85em]">
              chrome://settings/content/all
            </code>
            .
          </li>
        </ul>
      </section>

      <section aria-labelledby="children-heading">
        <h2 id="children-heading" className="mt-8 mb-3 text-lg font-semibold">
          Children
        </h2>
        <p className="mb-4">Mindfully is not directed at children under 13.</p>
      </section>

      <section aria-labelledby="changes-heading">
        <h2 id="changes-heading" className="mt-8 mb-3 text-lg font-semibold">
          Changes
        </h2>
        <p className="mb-4">
          We may update this policy. The “Last updated” date will change;
          continued use after updates means you accept the revised policy.
        </p>
      </section>

      <section aria-labelledby="limited-use-heading">
        <h2
          id="limited-use-heading"
          className="mt-8 mb-3 text-lg font-semibold"
        >
          Limited Use
        </h2>
        <p className="mb-4">
          Mindfully’s use of information complies with the{" "}
          <a
            href="https://developer.chrome.com/docs/webstore/program-policies"
            className="text-[#17968c] hover:text-[#2ec4b6]"
          >
            Chrome Web Store User Data Policy
          </a>
          , including the{" "}
          <a
            href="https://developer.chrome.com/docs/webstore/program-policies/policies#limited_use"
            className="text-[#17968c] hover:text-[#2ec4b6]"
          >
            Limited Use
          </a>{" "}
          requirements. We do not use user data for purposes unrelated to the
          extension’s single purpose, we do not sell user data, and we do not
          use it for advertising.
        </p>
      </section>
    </main>
  );
}
