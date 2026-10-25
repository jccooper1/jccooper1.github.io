# jekyll-cache-bust's bust_css_cache hashes assets/_sass, which doesn't exist in
# this theme (styles live in _sass), so main.css always got the same ?v= and
# browsers kept serving a stale stylesheet. This hashes the real Sass sources.
module Jekyll
  module SassCacheBust
    require 'digest/md5'

    SOURCES = ['_sass/**/*.scss', 'assets/css/main.scss'].freeze

    def bust_sass_cache(file_name)
      site_source = @context.registers[:site].source
      files = SOURCES.flat_map { |pattern| Dir[File.join(site_source, pattern)] }.sort
      [file_name, '?v=', Digest::MD5.hexdigest(files.map { |f| File.read(f) }.join)].join
    end
  end
end

Liquid::Template.register_filter(Jekyll::SassCacheBust)
