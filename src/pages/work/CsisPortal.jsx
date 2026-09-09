import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import Figure from '../../components/Figure.jsx'
import { bySlug } from '../../data/projects.js'
import { asset } from '../../data/assets.js'

const project = bySlug('csis-portal')

export default function CsisPortal() {
  useReveal()
  const hero = asset('csis-dashboard')
  return (
    <>
      {/* 1. Header band */}
      <CaseHeader project={project}>
        <div className="thumb" style={{ aspectRatio: '16 / 10' }}>
          <img src={hero.src} alt={hero.alt} width={hero.w} height={hero.h} decoding="async" />
        </div>
        {hero.pending && <span className="ph-note">Asset pending: dashboard screenshot</span>}
      </CaseHeader>

      <CaseBody>
        {/* 2. Problem / context */}
        <CaseSection id="problem" eyebrow="Problem" title="Three user roles, one system, no separate products">
          <div className="prose">
            <p>
              The Computer Science &amp; Information Systems department needed a single
              web platform serving three groups whose relationship to it is completely
              different. An <strong>administrator</strong> manages accounts, permissions
              and the shape of the system itself. <strong>Staff</strong> publish and
              maintain content and need to see the state of their own material.{' '}
              <strong>Students</strong> mostly consume. They arrive with a specific
              question and want it answered without learning an information architecture
              first.
            </p>
            <p>
              The tempting answer is three interfaces. The reason that answer is wrong is
              cost: three interfaces means three navigation models to maintain, three
              places for a change to be forgotten, and a support burden that grows with
              every feature. The brief was one coherent system that presents itself
              differently depending on who is looking at it.
            </p>
          </div>
        </CaseSection>

        {/* 3. Process / research */}
        <CaseSection id="process" eyebrow="Process" title="Designing from permissions outward">
          <div className="prose">
            <p>
              Rather than starting from screens, the work started from a matrix of what
              each role can see and do. Every screen in the portal was then specified as
              one layout with role-conditional regions, which meant the design questions
              became concrete: does this student see an empty state, a reduced version, or
              nothing at all in the place where an admin sees a control?
            </p>
            <p>
              That framing settled a lot of arguments early. Where a region would be
              empty for a role, it collapses rather than showing a disabled control.
              Disabled controls advertise capability the user will never have, which
              reads as a broken product rather than a scoped one.
            </p>
          </div>
        </CaseSection>

        {/* 4. Key decisions / flow walkthrough */}
        <CaseSection id="flow" eyebrow="Walkthrough" title="From sign-in to system administration">
          <Decision n={1} title="One entry point, regardless of role">
            <p>
              Every user signs in through the same door. Role resolution happens after
              authentication, not before it, so nobody has to know which kind of user they
              are before they can log in, a surprisingly common failure in institutional
              systems. Magic-link sign-in and password recovery were designed as
              additional flows off this screen rather than as separate destinations.
            </p>
            <Figure
              assetKey="csis-login"
              label="Login"
              caption="A single sign-in for all three roles. Magic link and password recovery are additional flows branching from here rather than parallel entry points."
            />
          </Decision>

          <Decision n={2} title="A dashboard that changes contents, not structure">
            <p>
              The dashboard keeps the same skeleton for everyone (sidebar, statistic row,
              activity feed) while the contents shift by role. An admin sees
              system-wide counts, staff see their own content and its status, students see
              what is relevant to them. Holding the structure constant means a student who
              later becomes a demonstrator does not have to relearn where things live.
            </p>
            <Figure
              assetKey="csis-dashboard"
              label="Admin"
              caption="System-wide counts: 156 content items, 8 pending approvals, 342 active users. The sidebar carries Admin Panel, Approvals, Analytics and User Management."
            />
            <div className="figure-row">
              <Figure
                assetKey="csis-staff-dash"
                label="Staff"
                caption="The same skeleton, counting the author’s own work instead: my content, drafts, published, scheduled. The sidebar drops to My Content, Create New, Calendar."
              />
              <Figure
                assetKey="csis-student-dash"
                label="Student"
                caption="Announcements, events and news, and a sidebar with no authoring or admin entries at all. Navigation is never a list of doors that turn out to be locked."
              />
            </div>
          </Decision>

          <Decision n={3} title="Approval as a first-class screen, not a hidden mode">
            <p>
              Approving a submission is the most consequential thing an administrator does
              here, so it gets a real screen with the state visible up front rather than
              being buried in a settings menu. Each queued item shows what it is, who
              submitted it, how long it has waited, and which audiences it is aimed at,
              which is everything needed to decide without opening it.
            </p>
            <p>
              Approve and Reject sit side by side, weighted differently: the approval is
              the solid green button, the rejection is outlined. View is available for the
              cases where the summary is not enough. The list is the interface, and the
              current state is readable before any action is taken.
            </p>
            <Figure
              assetKey="csis-admin"
              label="Approvals queue"
              caption="Three pending items with author, elapsed time and audience tags. The decision is answerable from the row itself."
            />
          </Decision>

          <Decision n={4} title="Content editing that doesn’t require a mental model of the CMS">
            <p>
              Staff publishing content are not administrators of it. The content screens
              put the page list and the editor in the same view so the relationship
              between “what exists” and “what I am changing” is never inferred from
              navigation history.
            </p>
            <Figure
              assetKey="csis-cms"
              label="Content management"
              caption="Status filters across the top, draft through scheduled, with the type filters beside them. Publication status shows against each item rather than being discovered on save, and a scheduled item states its date inline."
            />
          </Decision>

          <Decision n={5} title="Mobile drops the sidebar, keeps the hierarchy">
            <p>
              On a phone the sidebar collapses into a single-column flow, but the order of
              information is preserved exactly. Students are the heaviest mobile users and
              the most likely to arrive from a link with one specific question, so the
              mobile layout is optimised for answering that question without navigating.
            </p>
            <Figure
              assetKey="csis-mobile"
              label="Mobile view"
              caption="Single-column layout with the sidebar behind a menu. Nothing is removed: the same content in the same order, reflowed."
            />
          </Decision>

          <div className="callout">
            <h3>Additional flows</h3>
            <p>
              Magic-link sign-in, password recovery, account creation, notification
              preferences and content archiving were all designed as part of the system
              but are not shown here. They follow the same role-conditional pattern
              established above, and showing every screen would obscure the argument
              rather than support it.
            </p>
          </div>
        </CaseSection>

        {/* 6. Outcomes */}
        <CaseSection id="outcomes" eyebrow="Outcomes" title="What this achieved">
          <div className="prose">
            <p>
              The system ships as one interface with role-conditional regions rather than
              three parallel products, which was the core thing the brief asked for. The
              navigation model is learned once and holds across roles.
            </p>
            <p>
              <strong>Working inside a real brand constraint.</strong> Everything here sits
              inside the University of Limerick institutional identity, including its
              green (#005335), a colour with genuine accessibility consequences, since it
              is dark enough to demand white text and saturated enough that it cannot be
              used casually for large surfaces. Designing within a fixed institutional
              palette rather than choosing one is a different discipline, and closer to
              most client work than a free hand would be.
            </p>
          </div>
        </CaseSection>

        {/* 7. Reflection */}
        <CaseSection id="reflection" eyebrow="Reflection" title="Limitations and next steps" narrow>
          <div className="prose">
            <p>
              <strong>The role model is coarse.</strong> Three roles cover the department
              as it is today, but real institutions accumulate edge cases: a PhD
              candidate who teaches, an external examiner with time-limited access. The
              current design would need a permissions layer underneath the roles rather
              than more roles.
            </p>
            <p>
              <strong>Not validated with students at scale.</strong> The role-conditional
              approach was reasoned from the permission matrix and reviewed internally, not
              tested with a cohort. The assumption most worth testing is that students
              never notice the regions that were collapsed for them.
            </p>
            <p>
              <strong>Next.</strong> Usability testing per role with real tasks, an audit
              of the UL green against WCAG AA at every size it is used, and a written
              component specification so the role-conditional patterns survive being built
              by someone who was not in the design conversations.
            </p>
          </div>
        </CaseSection>
      </CaseBody>


      <div className="section section--tight">
        <PrevNext slug="csis-portal" />
      </div>
    </>
  )
}
