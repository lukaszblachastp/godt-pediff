#!/bin/rake

# Needed for task desc rake/gem '= 0.9.2.2'
if defined? Rake::TaskManager.record_task_metadata
    Rake::TaskManager.record_task_metadata = true
end

task :default => [:build]

desc "Download and unpack pediff"
task :download do |task|
    puts task.comment
    `git clone git.int.vgnett.no:/git/stp/pediff ./tmp`
    `rm -rf ./tmp/.git`
    `cp -r ./tmp/* .`
    `rm -rf ./tmp`
end

desc "Install node dependencies"
task :npm do |task|
    puts task.comment
    sh "npm install"
end

desc "Run tasks"
task :run do |task|
    puts task.comment
    sh "./run-tasks.sh"
end

desc "Generate pediff report"
task :report do |task|
    puts task.comment
    sh "node_modules/casperjs/bin/casperjs report/report.js"
end

desc "Download and unpack, install npm deps, run, generate report"
task :build do |task|
    puts task.comment
    Rake::Task["download"].invoke
    Rake::Task["npm"].invoke
    Rake::Task["run"].invoke
    Rake::Task["report"].invoke
end
