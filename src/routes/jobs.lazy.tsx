import { createLazyFileRoute } from '@tanstack/react-router'
document.title = 'Eco - Jobs';
export const Route = createLazyFileRoute('/jobs')({
  component: () => <JobsPage />
})

function JobsPage() {
  return(
    <section className='d-flex col-lg-offset-2 col-lg-8 justify-content-center mt-5'>
      <div className="col-md-12">
        <article className="col-md-12">
          <div className="job-types-wrapper first-section">
            <h1>Graphics and Optimization Programmer</h1>
            <p><b>Job Description</b></p>
            <p><span className="fw-bold">Strange Loop is looking to hire an experienced Unity programmer to optimize and improve the graphics and performance of our online multiplayer game Eco, the Eco engine, and future games based on the core technology. Join us as we work to bring games into education in a new way, creating worlds where students collaboratively apply what they’re learning. Eco can be found here: ‘http://store.steampowered.com/app/382310/Eco/’ and http://play.eco</span></p>
            <p><span className="fw-bold">You’ll be working with a remote team of passionate developers all across the world. You’ll have lots of flexibility to set your own hours and work when and where it is convenient.&nbsp;&nbsp;</span></p>
            <p><b>Requirements</b></p>
            <p><span className="fw-bold">– Solid experience with Unity with a portfolio and code samples</span></p>
            <p><span className="fw-bold">– Experience in optimization, understanding principles of optimization in Unity on CPU and GPU;</span></p>
            <p><span className="fw-bold">– Understanding how to use Profiler (how to identify bottlenecks, how to analyze profiling results);</span></p>
            <p><span className="fw-bold">– Fluent in multi-threading and concurrency;</span></p>
            <p><span className="fw-bold">– Good Shader knowledge (including Compute Shaders);</span></p>
            <p><span className="fw-bold">– Fluent English skills</span></p>
            <p><b>Not Required but Helpful</b></p>
            <p><span className="fw-bold">– Experience with Unity DOTS</span></p>
            <p><span className="fw-bold">– Computer science degree or equivalent in work experience.</span></p>
            <p><span className="fw-bold">– Experience playing Eco and an interest in joining the team.</span></p>
            <p><span className="fw-bold">– References with other teams you’ve worked with.</span></p>
            <p><span className="fw-bold">– Remote work / Work From Home (WFH) experience</span></p>
            <p><span className="fw-bold">– Hobby game experience&nbsp;</span></p>
            <p><b>What we are offering</b></p>
            <ul>
              <li className="fw-bold"><span className="fw-bold">Pay will be a salary for full-time work (or optionally hourly if they want more flexibility), and they can make their own hours.</span></li>
              <li className="fw-bold"><span className="fw-bold">Pay rate will be on the medium to high-end for programmers in their region of their experience level.</span></li>
              <li className="fw-bold"><span className="fw-bold">We are looking for long-term individual team members, not freelancers or outsourcing firms.</span></li>
            </ul>
            <div className="jobs-email">Send resume and intro letter (with job title in email subject) to <a href="mailto:jobs@strangeloopgames.com" className="btn btn-small">jobs@strangeloopgames.com</a>
            </div>
          </div>
          <div className="job-types-wrapper">
            <h1>Unity Programmer</h1>
            <p><b>Job Description</b></p>
            <p><span className="fw-bold">Strange Loop is looking to hire experienced Unity programmers at various levels (junior to senior) to help build the online multiplayer game Eco, the Eco engine, and future games based on the core technology. Join us as we work to bring games into education in a new way, creating worlds where students collaboratively apply what they’re learning. Eco can be found here: ‘http://store.steampowered.com/app/382310/Eco/’ and http://play.eco</span></p>
            <p><span className="fw-bold">You’ll be working with a remote team of passionate developers all across the world. You’ll have lots of flexibility to set your own hours and work when and where it is convenient.&nbsp;&nbsp;</span></p>
            <p><b>Requirements</b></p>
            <p><span className="fw-bold">Computer science degree or equivalent in work experience.</span></p>
            <p><span className="fw-bold">Unity experience with a portfolio and code samples.</span></p>
            <p><span className="fw-bold">Experience playing Eco and an interest in joining the team.</span></p>
            <p><span className="fw-bold">References with other teams you’ve worked with.</span></p>
            <p><span className="fw-bold">Remote work / Work From Home (WFH) experience a plus.</span></p>
            <p><span className="fw-bold">Hobby game experience a plus.</span></p>
            <p><span className="fw-bold">Fluent English skills required.</span></p>
            <p><b>What we are offering</b></p>
            <ul>
              <li className="fw-bold"><span className="fw-bold">Pay will be salary for full-time work (or optionally hourly if they want more flexibility), and they can make their own hours.</span></li>
              <li className="fw-bold"><span className="fw-bold">Pay rate will be on the medium to high-end for programmers in their region of their experience level.</span></li>
              <li className="fw-bold"><span className="fw-bold">We are looking for long-term individual team members, not freelancers or outsourcing firms.</span></li>
            </ul>
            <div className="jobs-email">Send resume and intro letter (with job title in email subject) to <a href="mailto:jobs@strangeloopgames.com" className="btn btn-small">jobs@strangeloopgames.com</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
